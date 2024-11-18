import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {BaseComponent} from "../../../component/base.component";
import {AuthorizationPaths} from "../../authorization-routing.module";
import {SecurityUserApiService} from "../../../../api/services/security-user-api.service";
import {MatPaginator} from "@angular/material/paginator";
import {SecurityUserDto} from "../../../../api/models/security-user-dto";
import {SecurityUserFilterDto} from "../../../../api/models/security-user-filter-dto";
import {SecurityUserPaths, SecurityUserRoles} from "../security-user-routing.module";


@Component({
  selector: 'app-list-security-user',
  templateUrl: './list-security-user.component.html',
  styleUrl: './list-security-user.component.scss'
})
export class ListSecurityUserComponent extends BaseComponent<SecurityUserFilterDto> implements OnInit {

  public dataSource!: MatTableDataSource<SecurityUserDto>;

  public readonly HAS_PERMISSION_READ: boolean;
  public readonly HAS_PERMISSION_UPDATE: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  public formGroupListStatus!: FormGroup;


  public displayedColumns: string[] = ['login', 'nome', 'email', 'statusPortal', 'acoes'];
  public listStatusAtivosInativos = [
    { id: true, descricao: 'Ativo' },
    { id: false, descricao: 'Inativo' }
  ];

  constructor(
    public service: SecurityUserApiService
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      name: [''],
      login: [''],
      active: [true]
    });
    this.dataSource = new MatTableDataSource<SecurityUserDto>([]);
    this.HAS_PERMISSION_READ = this.securityService.hasRoles(SecurityUserRoles.READ)
    this.HAS_PERMISSION_UPDATE = this.securityService.hasRoles(SecurityUserRoles.UPDATE);
  }

  resetForm(): void {
    this.formGroup.reset();
    this.formGroup.get('active')?.patchValue(true);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = [];
  }

  search(): void {
    const filterDTO = this.model;
    // Chamada para pesquisar com filtroDTO
    this.service.securityUserControllerGetUsersByFilter({filtroDTO: filterDTO}).subscribe({
      next: value => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = value;
        this.initStatusList(value);
      }, error: data => {
        this.messageService.addMsgDanger(data);
        this.dataSource.data = [];
      }
    });
  }


  private initStatusList(value: Array<SecurityUserDto>) {
    this.formGroupListStatus = this.formBuilder.group({
      statusArray: this.formBuilder.array(
        value.map(userDto => this.formBuilder.control(userDto.status))
      )
    });
  }
  get statusArray(): FormArray {
    return this.formGroupListStatus.get('statusArray') as FormArray<FormControl>;
  }
  public getStatusAt(i: number){
    if(!this.statusArray.at(i)){ return new FormControl<boolean>(false);}
    return this.statusArray.at(i) as FormControl<boolean>;
  }

  public alterUserStatus(usuario: SecurityUserDto, i: number): void {
    let statusAt = this.getStatusAt(i);
    if (!statusAt.value) {
      this.inactivate(usuario, i);
    } else {
      this.activate(usuario,i);
    }
  }
  /**
   * Ativa o Usuário informado.
   *
   * @param usuario
   */
  private activate(usuario: any, i: number): void {
    this.messageService.addConfirmYesNo('Deseja ativar este item?', () => {
      this.service.securityUserControllerActivateUser({id: usuario.id}).subscribe(() => {
        this.messageService.addMsgSuccess('Operação realizada com sucesso!');
      }, error => {
        usuario.status = false;
        this.formGroup.patchValue({status: usuario.status});
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = false;
      this.formGroup.patchValue({status: usuario.status});
      const statusControl = this.statusArray.at(i);
      statusControl.setValue(usuario.status);
    });
  }

  /**
   * Inativa o Usuário informado.
   *
   * @param usuario
   */
  private inactivate(usuario: any, i: number): void {
    this.messageService.addConfirmYesNo('Deseja inativar este item?', () => {
      this.service.securityUserControllerInactivateUser({id: usuario.id}).subscribe(() => {
        this.messageService.addMsgSuccess('Operação realizada com sucesso!');
      }, error => {
        usuario.status = true;
        this.formGroup.patchValue({status: usuario.status});
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      usuario.status = true;
      this.formGroup.patchValue({status: usuario.status});
      const statusControl = this.statusArray.at(i);
      statusControl.setValue(usuario.status);
      this.changeDetector.detectChanges();
    });
  }

  getBaseURL(): string {
    return AuthorizationPaths.SECURITY_USER;
  }

  protected setFormCustomFields(userDto: SecurityUserFilterDto): void {
  }

  protected readonly SecurityUserRoles = SecurityUserRoles;
  protected readonly AuthorizationPaths = AuthorizationPaths;
  protected readonly SecurityUserPaths = SecurityUserPaths;
}
