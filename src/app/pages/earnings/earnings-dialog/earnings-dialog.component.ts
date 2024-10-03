import {Component, Inject, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {IncomeControllerService} from "../../../api/services/income-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Message, MessageService} from "../../../architecture/message/message.service";
import {IncomeDto} from "../../../api/models/income-dto";

@Component({
    selector: 'app-earnings-dialog',
    templateUrl: './earnings-dialog.component.html',
    styleUrl: './earnings-dialog.component.scss'
})
export class EarningsDialogComponent {
    categoria!: String;
    categorias: string[] = ['Salário', 'Freelance', 'Investimentos'];
    formGroup!: FormGroup;
    public readonly ACAO_INCLUIR = "Adicionar Gastos";
    public readonly ACAO_EDITAR = "Editar Gastos";
    acao: string = this.ACAO_INCLUIR;
    id!: number;

    constructor(
        public dialogRef: MatDialogRef<EarningsDialogComponent>,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private adapter: DateAdapter<any>,
        public earningService: IncomeControllerService,
        private dialog: MatDialog,
        private messageService: MessageService,
        @Inject(MAT_DIALOG_DATA) public data: { name: string }
    ) {
        this.creatForm();
        this.adapter.setLocale('pt-br');
        this.editEarnings();
    }

    public creatForm() {
        this.formGroup = this.formBuilder.group({
                name: [null, Validators.required],
                categoryName: [null, Validators.required],
                description: [null, Validators.required],
                incomeDate: [new Date(), Validators.required],
                amount: [null, [Validators.required, Validators.min(0)]],
                repeat: [null, Validators.required],
                leadTime: [0, Validators.min(0)],
            }
        )
    }


    public closeDialog(): void {
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            if (!this.id) {
                this.includeEarnings();
            } else {
                this.editingEarnings();
            }
        }
    }

    private includeEarnings() {
        if (this.formGroup.valid) {

            console.log("Dados:", this.formGroup.value);
            this.earningService.create({body: this.formGroup.value}).subscribe(
                retorn => {
                    this.confirmAction(retorn, this.ACAO_INCLUIR);
                    this.closeDialog();
                    console.log("Retorno", retorn);
                    alert("Inclusão com Sucesso ! Mensagem Server" + retorn)
                }, erro => {
                    console.log("Erro", +erro);
                    alert("Erro ao Incluir !");
                }
            )
        }
    }

    private editEarnings() {
        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            const id = parseInt(paramId);
            console.log("id", paramId);
            this.earningService.getById({id: id}).subscribe(
                retorn => {
                    this.acao = this.ACAO_EDITAR;
                    console.log("retorno", retorn);
                    // this.id = retorn.id;
                    retorn.incomeDate = `${retorn.incomeDate}T03:00:00.000Z`;
                    this.formGroup.patchValue(retorn);
                }, error => {
                    console.log("erro", error);
                    this.messageService.addMsgWarning(`Erro ao buscar ID: ${id}, mensagem: ${error.message}`);
                }
            )
        }
    }

    private editingEarnings() {
        console.log("Dados:", this.formGroup.value);
        this.earningService.update({id: this.id, body: this.formGroup.value}).subscribe(retorn => {
                this.confirmAction(retorn, this.ACAO_EDITAR);
                this.closeDialog();

            }, erro => {
                console.log("Erro:", erro.error);
                this.showError(erro, this.ACAO_EDITAR);
            }
        )
    }

    confirmAction(incomeDto: IncomeDto, acao: String) {
        this.messageService.addMsgSuccess(`Ação de ${acao} dados: ${incomeDto.name} (ID: ${incomeDto.id}) realizada com sucesso!`);
    }

    showError(erro: Message, acao: string) {
        this.messageService.addConfirmOk(`Erro ao ${acao}, Mensagem: ${erro.message}`);
    }

    onCategoryChange(): void {

    }

    addCategory(): void {

    }

    editCategory(): void {

    }

    removeCategory(): void {

    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
