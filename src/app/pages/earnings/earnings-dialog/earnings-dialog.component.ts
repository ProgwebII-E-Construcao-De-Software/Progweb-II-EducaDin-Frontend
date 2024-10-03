import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IncomeControllerService } from "../../../api/services/income-controller.service";
import {Message, MessageService} from "../../../architecture/message/message.service";
import { IncomeDto } from "../../../api/models/income-dto";

@Component({
    selector: 'app-earnings-dialog',
    templateUrl: './earnings-dialog.component.html',
    styleUrls: ['./earnings-dialog.component.scss']
})
export class EarningsDialogComponent implements OnInit {
    categoria!: String;
    categorias: string[] = ['Salário', 'Freelance', 'Investimentos'];
    formGroup!: FormGroup;
    public readonly ACAO_INCLUIR = "Adicionar Ganhos";
    public readonly ACAO_EDITAR = "Editar Ganhos";
    acao: string = this.ACAO_INCLUIR;
    id!: number;

    constructor(
        public dialogRef: MatDialogRef<EarningsDialogComponent>,
        private formBuilder: FormBuilder,
        public earningService: IncomeControllerService,
        private messageService: MessageService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log('Dados recebidos no diálogo:', this.data);
        this.id = data.id;
        this.creatForm();
    }

    ngOnInit(): void {
        if (this.id) {
            console.log('ID do ganho a ser editado:', this.id);
            this.acao = this.ACAO_EDITAR;
            this.editEarnings(this.id);
        } else {
            console.log('Nenhum ID foi passado, modo de criação ativado.');
        }
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
        });
    }

    private editEarnings(id: number) {
        this.earningService.getById({ id }).subscribe(
            retorn => {
                console.log("retorno", retorn);
                incomeDate: retorn.incomeDate ? new Date(retorn.incomeDate) : new Date(),
                this.formGroup.patchValue(retorn);
            }, error => {
                console.log("erro", error);
                this.messageService.addMsgWarning(`Erro ao buscar ID: ${id}, mensagem: ${error.message}`);
            }
        );
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            if (this.id) {
                this.editingEarnings();
            } else {
                this.includeEarnings();
            }
        }
    }

    private includeEarnings() {
        if (this.formGroup.valid) {
            console.log("Dados:", this.formGroup.value);
            this.earningService.create({ body: this.formGroup.value }).subscribe(
                retorn => {
                    this.confirmAction(retorn, this.ACAO_INCLUIR);
                    this.closeDialog();
                    console.log("Retorno", retorn);
                }, erro => {
                    console.log("Erro", erro);
                }
            );
        }
    }

    private editingEarnings() {
        const formData: IncomeDto = this.formGroup.value;
        console.log("Dados:", formData);
        this.earningService.update({ id: this.id, body: formData }).subscribe(
            retorn => {
                this.confirmAction(retorn, this.ACAO_EDITAR);
                this.closeDialog();
            }, erro => {
                console.log("Erro:", erro.error);
                this.showError(erro, this.ACAO_EDITAR);
            }
        );
    }

    confirmAction(incomeDto: IncomeDto, acao: string) {
        this.messageService.addMsgSuccess(`Ação de ${acao} dados: ${incomeDto.name} (ID: ${incomeDto.id}) realizada com sucesso!`);
    }

    showError(erro: Message, acao: string) {
        this.messageService.addConfirmOk(`Erro ao ${acao}, Mensagem: ${erro.message}`);
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };
}
