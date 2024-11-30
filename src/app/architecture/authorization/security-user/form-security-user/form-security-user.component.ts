import {ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {BaseComponent} from "../../../component/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CrudActionService} from "../../../component/crud-action.service";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MessageService} from "../../../message/message.service";
import {ErrorService} from "../../../error.service";
import {SecurityUserApiService} from "../../../../api/services/security-user-api.service";
import {SecurityUserDto} from "../../../../api/models/security-user-dto";
import {SecurityService} from "../../../security/security.service";
import {SecurityUserRoles} from "../security-user-routing.module";
import {SecurityGroupDto} from "../../../../api/models/security-group-dto";
import {SecurityUserGroupDto} from "../../../../api/models/security-user-group-dto";
import {MatTableDataSource} from "@angular/material/table";
import {SecurityUserFoneDto} from "../../../../api/models/security-user-fone-dto";
import {SecurityGroupApiService} from "../../../../api/services/security-group-api.service";
import {AuthorizationPaths} from "../../authorization-routing.module";

@Component({
  selector: 'app-form-security-user',
  templateUrl: './form-security-user.component.html',
  styleUrl: './form-security-user.component.scss'
})
export class FormSecurityUserComponent  extends BaseComponent<SecurityUserDto> {

  public readonly HAS_PERMISSION_BLOCK_UNBLOCK: boolean;
  public readonly HAS_PERMISSION_ACTIVATE_INACTIVATE: boolean;

  public formGroupGroup!: FormGroup;

  public assignedGroups: Array<SecurityUserGroupDto> = [];
  public groupsList!: Array<SecurityGroupDto>;

  public userPhones: Array<SecurityUserFoneDto> = [];

  // Seleciona todos os campos do formulário para manipulação do foco
  @ViewChildren('formField') formFields!: QueryList<ElementRef>;


  public dataSourceGroups!: MatTableDataSource<SecurityUserGroupDto>;
  public displayedColumns!: string[];

  constructor(
    public service: SecurityUserApiService,
    public groupService: SecurityGroupApiService
  ) {
    super();
    this.formGroup = this.createForm();
    this.formGroupGroup = this.createFormGroup();

    this.HAS_PERMISSION_BLOCK_UNBLOCK = this.securityService.hasRoles(SecurityUserRoles.BLOCK_UNBLOCK);
    this.HAS_PERMISSION_ACTIVATE_INACTIVATE = this.securityService.hasRoles(SecurityUserRoles.ACTIVATE_INACTIVATE);

    this.dataSourceGroups = new MatTableDataSource<any>();

    if (this.crudAction.isActionCreate()) {
      this.dataSourceGroups.data = this.assignedGroups;
      this.loadGroups();
    }

    if (this.crudAction.isActionAlter()) {
      this.loadGroups();
    }

    //adicionado depois
    this.retriveAlterData()

    if (this.crudAction.isActionView()) {
      this.disableUserFormFields();
      this.displayedColumns = ['nomeGrupoVinculado'];
    } else {
      this.enableUserFormFields();
      this.displayedColumns = ['nomeGrupoVinculado', 'remover'];
    }
  }

  private createFormGroup() {
    return this.formBuilder.group({
      selectedGroup: [null, Validators.required]
    });
  }
  // Validação customizada para garantir ao menos um grupo
  loginValid(): ValidatorFn {
    return (control: AbstractControl) => {
      if(!control.parent?.get('login')?.value){ return null; }
      return control.parent?.get('validLogin')?.value ? null : { loginInvalid: true };
    };
  }

  public validarLogin(): void {
    if (this.model.login !== undefined) {
      // Verifica se o Login informado é válido e se está em uso
      var param = {login: this.model.login, id: this.model.id}
      this.service.securityUserControllerValidateUserLogin({
        login: this.model.login || '',
        id: Number(this.model.id || 0)
      })
        .subscribe({
          next: value => {
            this.formGroup.patchValue({validLogin:true});
            this.formGroup.get('login')?.updateValueAndValidity();
          },
          error: erro => {
            this.formGroup.patchValue({validLogin:false});
            this.formGroup.get('login')?.updateValueAndValidity();
            this.messageService.addMsgDanger(erro);
          }
        });
    }
  }

   /**
   * Cria o FormGroup para o usuário baseado no SecurityUserDto.
   */
  createForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      login: ['', [Validators.required, Validators.maxLength(20), this.loginValid()]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      status: [false],
      statusLabel: ['Inativo'],
      blockedAccess: [false],
      blockedAccessLabel: ['Bloqueado'],
      createdDate: [null],
      lastUpdateDate: [null],
      groups: [[], Validators.required],
      fones:[this.userPhones],
      validLogin:[true]
    });
  }

  disableUserFormFields():void {
    this.formGroup.disable();
    if(this.securityService.hasRoles(this.SecurityUserRoles.ACTIVATE_INACTIVATE)){
      this.formGroup.get('status')?.enable();
    }
  }
  enableUserFormFields(): void {
    this.formGroup.enable();
    this.formGroup.controls['blockedAccessLabel'].disable();
    this.formGroup.controls['statusLabel'].disable();

    if(!this.securityService.hasRoles(this.SecurityUserRoles.BLOCK_UNBLOCK)){
      this.formGroup.controls['blockedAccess'].disable();
    }
    if(!this.securityService.hasRoles(this.SecurityUserRoles.ACTIVATE_INACTIVATE)){
      this.formGroup.controls['status'].disable();
    }
  }


  protected override setFormCustomFields(userDto: SecurityUserDto) {
    this.formGroup.get('blockedAccessLabel')?.patchValue(userDto.blockedAccess ? 'Sim' : 'Não');
    this.formGroup.get('statusLabel')?.patchValue(userDto.status ? "Ativo" : "Inativo");


    this.userPhones = userDto.fones || [];
    this.assignedGroups = userDto.groups || [];
    this.dataSourceGroups.data = [...this.assignedGroups];
  }

  onSubmit() {
    this.formGroup.get('groups')?.markAsTouched();
    if (this.formGroup.valid) {
      const groupsSelecteds = this.formGroup.get('groups')?.value;
      if (groupsSelecteds?.length > 0) {

        this.errorService.handleLocalError()
        this.saveModel(this.model)
          .subscribe({
            next: value => {
              this.router.navigate([AuthorizationPaths.SECURITY_USER]);
              this.messageService.addMsgSuccess('Operação realizada com sucesso!');
            },
            error: err => {
              this.messageService.addMsgDanger(err);
            }
          });
      } else {
        this.messageService.addMsgSuccess('\u00C9 obrigat\u00F3rio informar pelo menos um grupo.');
      }
    } else {
      this.messageService.addMsgSuccess('Campo obrigat\u00F3rio n\u00E3o preenchido.');
      this.setFocusFirstInvalidFormField();
    }

  }

  private saveModel(model: SecurityUserDto) {
    if(!model.id){
      return this.service.securityUserControllerCreate({body: model});
    } else {
      return this.service.securityUserControllerUpdate({id: Number(model.id), body: model});
    }

  }

  private retriveAlterData() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      const codigo = parseInt(paramId);
      this.service.securityUserControllerGetById({id: codigo}).subscribe({
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

  public alterUserStatus(usuario: any): void {
    if (!usuario.status) {
      this.inactivate(usuario);
    } else {
      this.activate(usuario);
    }
  }
  /**
   * Ativa o Usuário informado.
   *
   * @param usuario
   */
  private activate(usuario: any): void {
    this.messageService.addConfirmYesNo('Deseja ativar este item?', () => {
      this.service.securityUserControllerActivateUser({id: usuario.id}).subscribe(() => {
        this.messageService.addMsgSuccess('Operação realizada com sucesso!');
      }, error => {
        usuario.status = false;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = false;
      this.formGroup.get('status')?.patchValue(usuario.status);
    });
  }

  /**
   * Inativa o Usuário informado.
   *
   * @param usuario
   */
  private inactivate(usuario: any): void {
    this.messageService.addConfirmYesNo('Deseja inativar este item?', () => {
      this.service.securityUserControllerInactivateUser({id: usuario.id}).subscribe(() => {
        this.messageService.addMsgSuccess('Operação realizada com sucesso!');
      }, error => {
        usuario.status = true;
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = true;
      this.formGroup.get('status')?.patchValue(usuario.status);
    });
  }


  public loadGroups(): void {
    this.groupService.securityGroupControllerGetActiveGroups().subscribe(
      data => {
        this.groupsList = data;
      },
      error => {
        this.groupsList = [];
        if (error.code !== 'ME003') { //TODO conferir
          this.messageService.addMsgDanger(error);
        }
      }
    );
    //delete this.grupoInclusao.grupo;
  }

  get availableGroups(): SecurityGroupDto[] {
    if(!this.groupsList){
      return [];
    }
    const avaliables = this.groupsList!
      .filter(value => !this.isGroupAlreadyAdded(value));
    //TODO AULA mostrar sem filtrar os grupos acima para poder mostrar mensagem de
    return  avaliables;
  }

  addGroup(): void {
    const selectedGroup = this.formGroupGroup.get('selectedGroup')?.value as SecurityGroupDto;
    if (!selectedGroup || !this.formGroupGroup.valid) {
      this.formGroupGroup.controls['selectedGroup'].setErrors({required: true});
      this.messageService.addMsgDanger('Por favor, selecione um grupo para adicionar.');
    } else if (!this.isGroupAlreadyAdded(selectedGroup)) {
      this.addGroupToUser(selectedGroup);
      this.formGroupGroup.reset();
      //manipulação manual dos erros para resetar o erro e não apresentar até que se clique novamente em add
      this.formGroupGroup.controls['selectedGroup'].setErrors(null);
    } else {
      this.messageService.addMsgWarning('Grupo já adicionado ao usuário');
    }
  }

  private addGroupToUser(selectedGroup: SecurityGroupDto) {
    const userGroupSelected: SecurityUserGroupDto = {
      userId: this.model.id,
      groupId: String(selectedGroup.id || 0),
      groupName: selectedGroup?.name,
    };
    const selectedSecurityUserGroups = this.model.groups;
    selectedSecurityUserGroups?.push(userGroupSelected);
    this.formGroup.get('groups')?.patchValue(selectedSecurityUserGroups);
    this.dataSourceGroups.data = [...this.dataSourceGroups.data, userGroupSelected];  // Atualiza a tabela
  }

// Verifica se o grupo já foi adicionado para evitar duplicatas
  isGroupAlreadyAdded(group: SecurityGroupDto): boolean {
    const selectedGroupIds = this.formGroup.value.groups as SecurityUserGroupDto[];
    return selectedGroupIds?.filter(value => value.groupId === String(group.id)).length > 0;
  }

  /**
   * Remove o Grupo da lista de grupos do Usuário.
   *
   * @param grupo
   */
  public removeGroup(grupo: any) {
    this.messageService.addConfirmYesNo('Remover o Grupo?', () => {
      const userGroupSelected: SecurityUserGroupDto = {
        userId: this.model.id,
        groupId: String(grupo.id || 0),
        groupName: grupo.name,
      };
      const selectedSecurityUserGroups = this.formGroup.get('groups')?.value as SecurityUserGroupDto[];
      const index = selectedSecurityUserGroups.indexOf(userGroupSelected);
      selectedSecurityUserGroups.splice(index, 1);
      this.formGroup.patchValue({groups: selectedSecurityUserGroups});
      this.dataSourceGroups.data = [...selectedSecurityUserGroups];
      this.messageService.addMsgSuccess('Operação realizada com sucesso!');
    });
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

  getBaseURL(): string {
    return AuthorizationPaths.SECURITY_USER;
  }

  protected readonly SecurityUserRoles = SecurityUserRoles;
}
