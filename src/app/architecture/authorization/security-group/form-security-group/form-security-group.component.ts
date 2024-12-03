import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../../component/base.component";
import {AuthorizationPaths} from "../../authorization-routing.module";
import {SecurityGroupRoles} from "../security-group-routing.module";

// @ts-ignore
import {orderBy} from 'lodash';

@Component({
  selector: 'app-form-security-group',
  templateUrl: './form-security-group.component.html',
  styleUrl: './form-security-group.component.scss'
})
export class FormSecurityGroupComponent   extends BaseComponent<SecurityGroupDto>  {

  // Seleciona todos os campos do formulário para manipulação do foco
  @ViewChildren('formField') formFields!: QueryList<ElementRef>;

  public readonly HAS_PERMISSION_ACTIVATE_INACTIVATE: boolean;

  securityModules! : Array<SecurityModuleDto>;
  securityModulesFiltered :Array<SecurityModuleDto> = [];

  constructor(
    private service: SecurityGroupApiService,
    private securityModuleApiService: SecurityModuleApiService
  ) {
    super();
    this.initForm();

    this.HAS_PERMISSION_ACTIVATE_INACTIVATE = this.securityService.hasRoles(SecurityGroupRoles.ACTIVATE_INACTIVATE);

    this.pkValue = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

    this.loadModules();
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.pkValue) {
      this.loadGroup();
    }
  }


  initForm(): void {
    this.formGroup = this.formBuilder.group({
      filterModule: [null],
      statusLabel: ['Ativo'],
      modules: this.formBuilder.array([]), // Array de SecurityModuleDto

      name: ['', Validators.required],
      status: [true, Validators.required],
      description: ['', Validators.required],
      groupFeatures: [[]],
    });
    //para atualizar os itens marcados sepre que o groupFeature for atualizado.
    this.formGroup.get('groupFeatures')?.valueChanges.subscribe(value => {
      this.checkFeatures();
    });
  }


  // Inicializa o FormArray de `modules`
  setModules(modules: SecurityModuleDto[]): void {
    const modulesArray = this.formGroup.get('modules') as FormArray;
    modules.forEach(module => modulesArray.push(this.createModuleFormGroup(module)));
  }

  // Cria um FormGroup para cada SecurityModuleDto
  createModuleFormGroup(module: SecurityModuleDto): FormGroup {
    return this.formBuilder.group({
      visible: [true],
      allChecked: [module.allChecked || false],
      features: this.formBuilder.array(module.features ? module.features.map(f => this.createFeatureFormGroup(f)) : []),
      id: [module.id || ''],
      mnemonic: [module.mnemonic || ''],
      name: [module.name || ''],
    });
  }

  // Cria um FormGroup para cada feature dentro de SecurityModuleDto
  createFeatureFormGroup(feature: SecurityFeatureDto): FormGroup {
    return this.formBuilder.group({
      id: [feature.id || ''],
      checked: [feature.checked || false],
      mnemonic: [feature.mnemonic || ''],
      name: [feature.name || ''],
    });
  }

  // Getter para acessar o FormArray de `modules`
  get modules(): FormArray {
    return this.formGroup.get('modules') as FormArray;
  }

  // Acessa o FormArray de `features` de um módulo específico
  getFeatures(moduleIndex: number): FormArray {
    return (this.modules.at(moduleIndex).get('features') as FormArray);
  }

  loadGroup(): void {
    this.service.securityGroupControllerGetById({id: this.pkValue||0}).subscribe(group => {
      this.model = group;

      if (this.crudAction.isActionView()) {
        this.disableUserFormFields();
      } else {
        this.enableUserFormFields();
      }
    });
  }

  public loadModules() {
    this.securityModuleApiService.getActiveModules().subscribe({
      next: data => {
        this.securityModules = data;
        this.securityModulesFiltered = orderBy(this.securityModules, 'name');

        // Ordena as Funcionalidades em ordem alfabetica.
        this.securityModules.forEach((item) => {
          item.features = orderBy(item.features, 'name');
        });

        this.setModules(this.securityModulesFiltered);
      },
      error: error => {
        this.securityModules = [];
        this.model.groupFeatures = []; //todo ver patch
        this.securityModulesFiltered = this.securityModules;

        if (error.code !== 'MODULEADMIN-MSG-002') {
          this.messageService.addMsgDanger(error);
        }
      }
    });

    this.formGroup.patchValue({filterModule: null});
  }

  /**
   * Marca ou desmarca todas as funcionalidades de um Módulo.
   *
   * @param idModule
   */
  public checkAllFeaturesModule(idModule: any) {
    const moduleFormGroup = this.modules.controls
      .find(moduleConrol => moduleConrol.value.id === idModule);

    let featuresFormArray = moduleFormGroup?.get('features') as FormArray;
    if( !(moduleFormGroup && moduleFormGroup.value.id && featuresFormArray)){ return ;}
    const checked = moduleFormGroup.value.allChecked;
    // Marcar todas
    for(let i = 0; i < featuresFormArray.length; i++){
      const featureFormGroup = featuresFormArray.at(i) as FormGroup;
      featureFormGroup.patchValue({checked: checked});
      let feature = featureFormGroup.value;

      this.checkFeatureModule(feature, checked);
    }
  }

  private checkFeatureModule(feature: SecurityFeatureDto, checked: boolean) {
    // Pega a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
    const groupFeature = this.getFeature(feature);

    if (checked) {
      //se não estiver na lista de feature dos usuário adiciona
      if (!(groupFeature && this.model.groupFeatures)) {
        // Insere a funcionalidade à lista de funcionalidades do grupo a ser alterado.
        const newGroupFeature = {feature: feature};
        this.model.groupFeatures?.push(newGroupFeature);
      }
    } else {
      if (groupFeature && this.model.groupFeatures) {
        // Remove a funcionalidade da lista de funcionalidades do grupo a ser alterado.
        this.model.groupFeatures.splice(this.model.groupFeatures.indexOf(groupFeature), 1);
      }
    }
  }

  /**
   * Atualiza a lista de Funcionalidades do Grupo, adicionando ou removendo a Funcionalidade marcada na tela.
   *
   * @param moduleId
   * @param feature
   * @param isCheckAllOperation Operação de Marcar/Desmarcar todas as funcionalidades.
   */
  public updateFeatures(moduleId: string|undefined, feature: SecurityGroupFeatureDto) {
    this.udpateAllNoneFeature(moduleId);

    // Pega a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
    const groupFeature = this.getFeature(feature);

    if (groupFeature && this.model.groupFeatures) {
      // Remove a funcionalidade da lista de funcionalidades do grupo a ser alterado.
      this.model.groupFeatures.splice(this.model.groupFeatures.indexOf(groupFeature), 1);
    } else {
      // Insere a funcionalidade à lista de funcionalidades do grupo a ser alterado.
      const newGroupfeature = {feature:feature};
      this.model.groupFeatures?.push(newGroupfeature);
    }
  }
  private udpateAllNoneFeature(moduleId: string|undefined){
    // Marca ou Desmarca o checkbox "Todos" referente ao "Módulo".

    let allChecked = true;
    const moduleFormGroup = this.modules.controls
      .find(moduleConrol => moduleConrol.value.id === moduleId);

    let featuresFormArray = moduleFormGroup?.get('features') as FormArray;

    if( !(moduleFormGroup && moduleFormGroup.value.id && featuresFormArray)){ return ;}

    // Marcar todas
    for(let i = 0; i < featuresFormArray.length; i++){
      const featureFormGroup = featuresFormArray.at(i) as FormGroup;
      if(!featureFormGroup.value.checked){
        allChecked = false;
      }
    }
    moduleFormGroup.patchValue({allChecked: allChecked});
  }

  /**
   * Configura as funcionalidades dos módulos carregados como checadas,
   * se encontradas na lista de funcionalidades do Grupo.
   *
   */
  private checkFeatures() {
    for (const module of this.modules?.controls) {
      let featuresFormArray = module.get('features') as FormArray;
      if(!featuresFormArray) { return; }
      // Marca o checkbox "Todos" do Módulo
      module.patchValue({allChecked: true});
      for (let i = 0; i < featuresFormArray.length; i++){
        const featureFormGroup = featuresFormArray.at(i) as FormGroup;
        // Pega a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
        const func = this.getFeature(featureFormGroup.value);

        if (func) {
          featureFormGroup.patchValue({checked: true});
        } else {
          featureFormGroup.patchValue({checked: false});
          module.patchValue({allChecked: false});
        }
      }
    }
  }


  /**
   * Retorna a funcionalidade, se estiver presente na lista de funcionalidades do grupo a ser alterado.
   *
   * @param feature
   */
  public getFeature(feature: SecurityFeatureDto) {
    let func;
    if (this.model.groupFeatures) {
      func = this.model.groupFeatures.find(funcionalidadeGrupo => funcionalidadeGrupo?.feature?.id === feature.id);
    } else {
      // Inicializa a lista de funcionalidades se não existir.
      this.model.groupFeatures = [];
    }
    return func;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.setFocusFirstInvalidFormField();
      return;
    }

    let moduleListFormArray = this.formGroup.get('modules') as FormArray;
    moduleListFormArray.clear();
    const dataGroup = this.formGroup.value;

    if (this.pkValue) {
      this.service.securityGroupControllerUpdate({id: this.pkValue, body: dataGroup})
        .subscribe( {next: value => {
          this.router.navigate([AuthorizationPaths.SECURITY_GROUP]);
        },
          error: error => {
          this.setModules(this.securityModulesFiltered);
          setTimeout(() => this.checkFeatures());
        }
      });
    } else {
      this.service.securityGroupControllerCreate({body: dataGroup})
        .subscribe({
          next: value => {
            this.router.navigate([AuthorizationPaths.SECURITY_GROUP]);
          },
          error: error => {
            this.setModules(this.securityModulesFiltered);
            setTimeout(() => this.checkFeatures());
          }
        });
    }
  }

  /**
   * Filtra os Módulos.
   *
   * @param filtro
   */
  public filterModule() {
    const filter = this.formGroup.get('filterModule')?.value;

    let formModuleGroups = this.formGroup.get('modules') as FormArray;
    for(let i = 0; i <  formModuleGroups.length; i++ ) {
      const formModuleGroup = formModuleGroups.at(i) as FormGroup;
      let groupName = formModuleGroup.get('name')?.value as string;
      if (groupName?.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
        formModuleGroup.patchValue({visible: true});
      } else {
        formModuleGroup.patchValue({visible: false});
      }
    }
  }

  getBaseURL(): string {
    return AuthorizationPaths.SECURITY_GROUP;
  }

  protected setFormCustomFields(modelDto: SecurityGroupDto): void {
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormGroup {
    const ctrl = absCtrl as FormGroup;
    return ctrl;
  }

  // Foca no primeiro campo inválido
  private setFocusFirstInvalidFormField(): void {
    const invalidControl = this.formFields.find((formField) => {
      const controlName = formField.nativeElement.getAttribute('formControlName');
      return this.formGroup.get(controlName)?.invalid || false;
    });

    if (invalidControl) {
      invalidControl.nativeElement.focus();
    }
  }

  protected readonly SecurityGroupRoles = SecurityGroupRoles;

  private disableUserFormFields() {
    this.formGroup.disable();

  }
  private enableUserFormFields() {
    this.formGroup.enable();

    if(!this.securityService.hasRoles(this.SecurityGroupRoles.ACTIVATE_INACTIVATE)){
      this.formGroup.controls['status'].disable();
    }
  }
}
