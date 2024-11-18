import {FormGroup, Validators} from "@angular/forms";
import {NgModule} from "@angular/core";
import {Observable, of} from "rxjs";
import {BaseComponent} from "./base.component";
import {GenericDto} from "../../api/models/generic-dto";
import {HttpContext} from "@angular/common/http";

export type BaseFormComponentConfig<
  MODEL extends GenericDto,
  CREATE_MODEL,
  UPDATE_MODEL extends GenericDto
> = {
  ENTITY_NAME_LABEL: string;
  CREATE_ROLE?: string,
  UPDATE_ROLE?: string,
  METHOD_GET?: (params: { id: number }, context?: HttpContext) => Observable<MODEL> ;
  METHOD_CREATE?: (params: { body: CREATE_MODEL }, context?: HttpContext) => Observable<MODEL> ,
  METHOD_UPDATE?: (params: {id: any, body: UPDATE_MODEL}, context?: HttpContext) => Observable<MODEL> ,
  METHOD_REMOVE?: (params: { id: number }, context?: HttpContext) => Observable<MODEL> ;
  MODEL_CREATE_DEFAULT?: CREATE_MODEL;
  MODEL_UPDATE_DEFAULT?: UPDATE_MODEL;
};

@NgModule()
export abstract class BaseFormComponent<
  MODEL extends GenericDto,
  CREATE_MODEL,
  UPDATE_MODEL extends GenericDto
> extends BaseComponent<MODEL>{

  public HAS_PERMISSION_CREATE: boolean;
  public HAS_PERMISSION_UPDATE: boolean;

  public _modelCreateDefault?: CREATE_MODEL;
  public _modelUpdateDefault?: UPDATE_MODEL;

  private _entityNameLabel: string;
  private _createMethod?: (params: { body: CREATE_MODEL }, context?: HttpContext) => Observable<MODEL> ;
  private _updateMethod?: (params: { id: any, body: UPDATE_MODEL }, context?: HttpContext) => Observable<MODEL> ;
  private _removeMethod?: (params: { id: number }, context?: HttpContext) => Observable<MODEL> ;
  private _getMethod?: (params: { id: number }, context?: HttpContext) => Observable<MODEL> ;

  abstract getComponentConfigs(): BaseFormComponentConfig<MODEL, CREATE_MODEL, UPDATE_MODEL>;

  protected constructor(
  ) {
    super();
    let componentConfigs = this.getComponentConfigs();
    this._entityNameLabel = componentConfigs.ENTITY_NAME_LABEL;
    this.HAS_PERMISSION_CREATE = this.securityService.hasRoles(componentConfigs.CREATE_ROLE || "");
    this.HAS_PERMISSION_UPDATE = this.securityService.hasRoles(componentConfigs.UPDATE_ROLE || "");
    this._createMethod = componentConfigs.METHOD_CREATE;
    this._updateMethod = componentConfigs.METHOD_UPDATE;
    this._removeMethod = componentConfigs.METHOD_REMOVE;
    this._getMethod = componentConfigs.METHOD_GET;

    this._modelCreateDefault = componentConfigs.MODEL_CREATE_DEFAULT;
    this._modelUpdateDefault = componentConfigs.MODEL_UPDATE_DEFAULT;

    if(this._modelUpdateDefault === undefined && this._modelCreateDefault === undefined){
      throw "CREATE_MODEL_DEFAULT ou UPDATE_MODEL_DEFAUTL deve ser definido na configuração do form"
    }

    if(this._modelCreateDefault != undefined) {
      const createKeys = Object.keys(this._modelCreateDefault);
    }
    if(this.crudAction.isActionCreate()){
      this.formGroup = this._initFormModelCreate();
    }else {
      this.formGroup = this._initFormModelUpdate();
    }
  }

  abstract initFormModelCreate():FormGroup | undefined;
  abstract initFormModelUpdate():FormGroup | undefined;

  protected _initFormGroup(model: CREATE_MODEL | UPDATE_MODEL): FormGroup{
    let modelKeysValue = model as { [key: string]: any };

    let entityCreateAttributes = Object.keys(modelKeysValue);

    const formControls: { [key: string]: any } = {};
    let modelDefault = modelKeysValue;

    // Itera sobre os atributos e cria um controle de formulário para cada um
    entityCreateAttributes.forEach(attr => {

      // Verifica se o atributo está definido
      let modelAttr = modelDefault[attr] ;
      const isRequired =  modelAttr !== undefined;
      //tratamento para chave estrangeira obrigatório utilizando valor 0
      if( typeof modelAttr == "number"){
        if(modelAttr as number === 0){
          modelAttr = undefined;
        }
      }

      // Adiciona o controle ao FormGroup com validação condicional
      formControls[attr] = isRequired ? [modelAttr, Validators.required] : [modelAttr];
    });

    // Cria o FormGroup com os controles definidos
    return this.formBuilder.group(formControls);
  }

  protected _initFormModelCreate(): FormGroup {
    const formModelCreate = this.initFormModelCreate();
    if(formModelCreate != undefined) {
      return formModelCreate;
    }
    if(this._modelCreateDefault == undefined) {
      throw "MODEL_CREATE_DEFAULT não foi informado nas configurações inciais";
    }
    return this._initFormGroup(this._modelCreateDefault);

  }

  protected _initFormModelUpdate(): FormGroup {
    const formModelUpdate = this.initFormModelUpdate();
    if(formModelUpdate != undefined) {
      return formModelUpdate;
    }

    if(this._modelUpdateDefault == undefined && this._modelCreateDefault == undefined) {
      throw "MODEL_UPDATE_DEFAULT não foi informado nas configurações inciais";
    }


    let modelUpdateDefault: UPDATE_MODEL | CREATE_MODEL  = this._modelUpdateDefault || this._modelCreateDefault || {} as CREATE_MODEL;

    return this._initFormGroup(modelUpdateDefault);

  }

  override ngOnInit() {
    super.ngOnInit();
    this.retriveAlterData()
  }

  confirmDelete(model: MODEL) {
    this.messageService.addConfirmYesNo(`Confirmar a exclusão da ${this._entityNameLabel}?`,() => {
      this.remover(model);
    });
  }

  remover(model: MODEL) {
    this.removeModel(model)
      .subscribe({next: returnValue => {
          this.messageService.addMsgSuccess(`${this._entityNameLabel} excluída com sucesso!!!`);
          this.router.navigate([this.baseURL]);
        }, error: error =>{
          if (error.status === 404) {
            this.messageService.addMsgInf(`${this._entityNameLabel} não existe mais.`);
          } else {
            this.messageService.addMsgDanger("Erro ao excluir: "+error.message);
          }
        }
      });
  }

  removeModel(model: MODEL):Observable<MODEL>{
    if (this._removeMethod === undefined){
      this.messageService.addMsgDanger("Methodo remover não configurado!(PROGAMATION ERROR)");
      throw "Method remover não definido ";
    }
    let id = model.id || 0;
    return this._removeMethod({id: id}) || of(undefined)
  };


  private retriveAlterData() {
    if(this._getMethod === undefined){
      this.messageService.addMsgDanger("Methodo getMethod não configurado!(PROGAMATION ERROR)");
      throw "Method getMethod não definido ";
    }
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId){
      const codigo = parseInt(paramId);
      this.errorService.handleLocalError();
      this._getMethod({id: codigo}).subscribe({
        next: returnValue => {
          this.pkValue = returnValue.id;
          this.model = returnValue;
        },
        error: error => {
          this.messageService.addMsgWarning(`Erro ao buscar ID: ${codigo}, mensagem: ${error.error.message}`);
        }
      });
    }
  }



  onSubmit() {
    if(this.formGroup.valid) {
      if (!this.pkValue) {
        this.errorService.handleLocalError();
        if(this._createMethod === undefined){
          this.messageService.addMsgDanger("Methodo createMethod não configurado!(PROGAMATION ERROR)");
          throw "Method createMethod não definido ";
        }
        this._createMethod({body: this.formGroup.value})
          .subscribe({
            next: returnValue => {
              this.messageService.addMsgSuccess(`${this._entityNameLabel} incluída com sucesso!`);
              this.router.navigate([this.baseURL]);
            },
            error: err => {
              this.messageService.addMsgDanger(`Erro ao incluir ${this._entityNameLabel.toLowerCase()}: ` + err.message);
            }
          });
      } else {

        if(this._updateMethod === undefined){
          this.messageService.addMsgDanger("Methodo updateMethod não configurado!(PROGAMATION ERROR)");
          throw "Method updateMethod não definido ";
        }
        //Tratamento global de erro
        this.errorService.handleLocalError();
        this._updateMethod({id: this.pkValue, body: this.formGroup.value})
          .subscribe({
            next: returnValue => {
              this.messageService.addMsgSuccess(`${this._entityNameLabel} alterada com sucesso!`);
              this.router.navigate([this.baseURL]);
            },
            error: err => {
              this.messageService.addMsgDanger(`Erro ao alterar ${this._entityNameLabel.toLowerCase()}: ` + err.message);
            }
          });
      }
    }
  }

}
