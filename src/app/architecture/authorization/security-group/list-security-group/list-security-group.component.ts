import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../component/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SecurityGroupFilterDto} from "../../../../api/models/security-group-filter-dto";
import {SecurityGroupDto} from "../../../../api/models/security-group-dto";
import {SecurityGroupApiService} from "../../../../api/services/security-group-api.service";
import {SecurityGroupPaths, SecurityGroupRoles} from "../security-group-routing.module";
import {AuthorizationPaths} from "../../authorization-routing.module";

@Component({
  selector: 'app-list-security-group',
  templateUrl: './list-security-group.component.html',
  styleUrl: './list-security-group.component.scss'
})
export class ListSecurityGroupComponent  extends BaseComponent<SecurityGroupFilterDto> implements OnInit {

  public dataSource!: MatTableDataSource<SecurityGroupDto>;

  public readonly HAS_PERMISSION_READ: boolean;
  public readonly HAS_PERMISSION_UPDATE: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  public formGroupListStatus!: FormGroup;


  public displayedColumns: string[] = [ 'name', 'statusPortal', 'actions'];
  public listStatusAtivosInativos = [
    { id: true, descricao: 'Ativo' },
    { id: false, descricao: 'Inativo' }
  ];

  constructor(
    public service: SecurityGroupApiService
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      name: [''],
      active: [true]
    });
    this.dataSource = new MatTableDataSource<SecurityGroupDto>([]);
    this.HAS_PERMISSION_READ = this.securityService.hasRoles(SecurityGroupRoles.READ)
    this.HAS_PERMISSION_UPDATE = this.securityService.hasRoles(SecurityGroupRoles.UPDATE);
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
    this.service.securityGroupControllerGetAllGroupByFilter({securityGroupFilterDTO: filterDTO}).subscribe({
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


  private initStatusList(value: Array<SecurityGroupDto>) {
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

  public alterGroupStatus(group: SecurityGroupDto, i: number): void {
    let statusAt = this.getStatusAt(i);
    if (!statusAt.value) {
      this.inactivate(group, i);
    } else {
      this.activate(group,i);
    }
  }
  /**
   * Ativa o Usuário informado.
   *
   * @param group
   * @param i
   */
  private activate(group: any, i: number): void {
    this.messageService.addConfirmYesNo('Deseja ativar este item?', () => {
      this.service.securityGroupControllerActivateGroup({id: group.id}).subscribe(() => {
        this.messageService.addMsgSuccess('Operação realizada com sucesso!');
      }, error => {
        group.status = false;
        this.formGroup.patchValue({status: group.status});
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      group.status = false;
      this.formGroup.patchValue({status: group.status});
      const statusControl = this.statusArray.at(i);
      statusControl.setValue(group.status);
    });
  }

  /**
   * Inativa o Usuário informado.
   *
   * @param group
   */
  private inactivate(group: any, i: number): void {
    this.messageService.addConfirmYesNo('Deseja inativar este item?', () => {
      this.service.securityGroupControllerInactivateGroup({id: group.id}).subscribe(() => {
        this.messageService.addMsgSuccess('Operação realizada com sucesso!');
      }, error => {
        group.status = true;
        this.formGroup.patchValue({status: group.status});
        this.messageService.addMsgDanger(error);
      });
    }, () => {
      group.status = true;
      this.formGroup.patchValue({status: group.status});
      const statusControl = this.statusArray.at(i);
      statusControl.setValue(group.status);
      this.changeDetector.detectChanges();
    });
  }

  getBaseURL(): string {
    return AuthorizationPaths.SECURITY_GROUP;
  }

  protected setFormCustomFields(securityGroupFilterDto: SecurityGroupFilterDto): void {
  }

  protected readonly SecurityGroupRoles = SecurityGroupRoles;
  protected readonly AuthorizationPaths = AuthorizationPaths;
  protected readonly SecurityGroupPaths = SecurityGroupPaths;

}
