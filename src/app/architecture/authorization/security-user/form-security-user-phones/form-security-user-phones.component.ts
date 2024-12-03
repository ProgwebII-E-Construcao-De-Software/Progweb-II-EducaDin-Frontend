import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PhoneType} from "../../authorization.constantes";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../message/message.service";
import {SecurityService} from "../../../security/security.service";
import {CrudAction} from "../../../component/curd-action";
import {SecurityUserFoneDto} from "../../../../api/models/security-user-fone-dto";
import {MatTableDataSource} from "@angular/material/table";

type PhoneFormType = { type: PhoneType, ddd: string, number: string };

@Component({
  selector: 'form-security-user-phones',
  templateUrl: './form-security-user-phones.component.html',
  styleUrl: './form-security-user-phones.component.scss'
})
export class FormSecurityUserPhonesComponent  implements OnInit {
  @Input() userId: any;
  private _userPhones: SecurityUserFoneDto[] = [];

  set userPhones(value: SecurityUserFoneDto[]){
    this._userPhones = value;
    if(value?.length > 0){
      this.dataSourceTelefones.data = this.userPhones
    }
  };

  @Input()
  get userPhones(): SecurityUserFoneDto[] {
    return this._userPhones;
  }

  phoneForm!: FormGroup;
  phoneTypeList: Array<PhoneType> = [];
  dataSourceTelefones!: MatTableDataSource<SecurityUserFoneDto>;

  public phoneMask!: string;

  crudAction: CrudAction;

  public displayedColumns: string[] = [];

  private dialogRef!: MatDialogRef<any>;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    public securityService: SecurityService,
    private fb: FormBuilder
  ) {
    this.initPhoneTypeList();
    this.crudAction = new CrudAction(route);
    this.createForm();

    if (this.crudAction.isActionView()) {
      this.displayedColumns = ['tipoTelefone', 'ddd', 'numeroTelefone'];
    } else {
      this.displayedColumns = ['tipoTelefone', 'ddd', 'numeroTelefone', 'remover'];
    }
  }

  private createForm() {
    this.phoneForm = this.fb.group({
      type: ['', Validators.required],
      ddd: ['', [Validators.required, Validators.maxLength(2)]],
      number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]]
    });
  }

  ngOnInit(): void {
    this.dataSourceTelefones = new MatTableDataSource<any>();
    this.dataSourceTelefones.data = this.userPhones;
  }

  addPhone(): void {
    if (this.phoneForm.valid) {
      var telefone = this.phoneForm.value as PhoneFormType;
      const telefoneDuplicado = this.validatePhoneDuplicated(telefone);

      if (!telefoneDuplicado) {
        this.userPhones.push({
          userId: this.userId,
          number: telefone.number,
          typeId: Number(telefone.type.id),
          typeDescription: telefone.type.descricao,
          ddd: telefone.ddd
        });
        this.dataSourceTelefones.data = this.userPhones;
        this.closeDialogs();
      } else {
        this.messageService.addMsgSuccess('Telefone já existe!');
      }
    }
  }

  /**
   * Fecar o Modal de Inclusão de Telefone.
   */
  public closeDialogs(): void {
    this.dialogRef.close();
    this.phoneForm.reset();
  }

  /**
   * Verifica se o telefone informado já foi adicionado na lista de Telefones do Usuário.
   *
   * @param phone
   */
  private validatePhoneDuplicated(phone: PhoneFormType): boolean {
    let duplicated = false;
    const dddAndNumber: string = phone.ddd.concat(phone.number);

    // Busca o Telefone na lista de Telefones do Usuário
    const phoneLocated = this.userPhones.find(telefoneLista => {
      return telefoneLista.ddd && telefoneLista.number && telefoneLista.ddd.concat(telefoneLista.number) === dddAndNumber;
    });

    if (phoneLocated !== undefined) {
      duplicated = true;
    }
    return duplicated;
  }

  /**
   * Remove o Telefone da lista de telefones do Usuário.
   *
   * @param telefone
   */
  public removePhone(telefone: SecurityUserFoneDto): void {
    this.messageService.addConfirmYesNo('Remover o telefone?', () => {
      const index = this.userPhones.indexOf(telefone);
      this.userPhones.splice(index, 1);
      this.dataSourceTelefones.data = this.userPhones;
      this.messageService.addMsgSuccess('Operação realizada com sucesso!');
    });
  }

  private initPhoneTypeList() {
    this.phoneTypeList = [];
    this.phoneTypeList.push(PhoneType.CELULAR);
    this.phoneTypeList.push(PhoneType.COMERCIAL);
    this.phoneTypeList.push(PhoneType.RESIDENCIAL);
  }

  /**
   * Abre o Modal de Inclusão de Telefone.
   *
   * @param template
   */
  public openDialogTelefone(template: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(template, {
      disableClose: true
    });
  }

  /**
   * Ajusta a Máscara do Telefone de acordo com seu tamanho.
   */
  public onTelefoneChange(): void {
    if (this.phoneForm.value.number.length < 9) {
      this.phoneMask = '0000-00009';
    } else {
      this.phoneMask = '00000-0000';
    }
  }
}
