import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseControllerService} from "../../../api/services/expense-controller.service";
import {Message, MessageService} from "../../../architecture/message/message.service";
import {ExpenseDto} from "../../../api/models/expense-dto";
import {ConfirmationDialog} from "../../../architecture/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";

@Component({
    selector: 'app-expenses-dialog',
    templateUrl: './expenses-dialog.component.html',
    styleUrls: ['./expenses-dialog.component.scss']
})
export class ExpensesDialogComponent implements OnInit {
    categoria!: String;
    categorias: string[] = ['Acessórios',
        'Alimentação',
        'Aluguel',
        'Animais de Estimação',
        'Assinaturas de Revistas',
        'Atividades Recreativas',
        'Academia',
        'Combustível',
        'Compras de Vestuário',
        'Cursos',
        'Cinema',
        'Decoração',
        'Despesas de Casa',
        'Despesas Emergenciais',
        'Despesas com Tecnologia',
        'Entretenimento',
        'Equipamentos Eletrônicos',
        'Eventos',
        'Exames',
        'Hobbies',
        'Hipoteca',
        'Hospedagem',
        'Internet',
        'Impostos',
        'Lanches',
        'Livros',
        'Manutenção de Veículo',
        'Medicamentos',
        'Mensalidade Escolar',
        'Multas',
        'Móveis',
        'Presentes',
        'Roupas de Trabalho',
        'Restaurantes',
        'Saúde',
        'Seguro do Veículo',
        'Streaming de Música e Vídeo',
        'Shows',
        'Turismo',
        'Tratamentos Estéticos',
        'Transporte',
        'Viagens',
        'Outros Gastos'];
    formGroup!: FormGroup;
    public readonly ACAO_INCLUIR = "Adicionar Gastos";
    public readonly ACAO_EDITAR = "Editar Gastos";
    acao: string = this.ACAO_INCLUIR;
    id!: number;

    constructor(
        public dialogRef: MatDialogRef<ExpensesDialogComponent>,
        private formBuilder: FormBuilder,
        public expenseService: ExpenseControllerService,
        private messageService: MessageService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private _adapter: DateAdapter<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log('Dados recebidos no diálogo:', this.data);
        this.id = data.id;
        this.creatForm();
        this._adapter.setLocale('pt-br');
    }

    ngOnInit(): void {
        if (this.id) {
            console.log('ID do gasto a ser editado:', this.id);
            this.acao = this.ACAO_EDITAR;
            this.editExpense(this.id);
        } else {
            console.log('Nenhum ID foi passado, modo de criação ativado.');
        }
    }

    public creatForm() {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            categoryName: [null, Validators.required],
            description: [null, Validators.required],
            expenseDate: [new Date(), Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            repeatable: ['DONT_REPEATS', Validators.required],
            leadTime: [0, Validators.min(0)],
        });
    }

    private editExpense(id: number) {
        this.expenseService.getById1({id}).subscribe(
            retorn => {
                console.log("retorno", retorn);
                this.formGroup.patchValue({
                    name: retorn.name ? retorn.name : null,
                    categoryName: retorn.categoryName ? retorn.categoryName : null,
                    description: retorn.description ? retorn.description : null,
                    expenseDate: retorn.expenseDate ? new Date(retorn.expenseDate) : new Date(),
                    amount: retorn.amount !== undefined && retorn.amount !== null ? retorn.amount : null,
                    repeatable: retorn.repeatable ? retorn.repeatable : 'DONT_REPEATS',
                    leadTime: retorn.leadTime !== undefined && retorn.leadTime !== null ? retorn.leadTime : 0
                });
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
                this.editingExpense();
            } else {
                this.includeExpense();
            }
        }
    }

    private includeExpense() {
        if (this.formGroup.valid) {
            console.log("Dados:", this.formGroup.value);
            this.expenseService.create1({body: this.formGroup.value}).subscribe(
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

    private editingExpense() {
        const formData: ExpenseDto = this.formGroup.value;
        console.log("Dados:", formData);
        this.expenseService.update1({id: this.id, body: formData}).subscribe(
            retorn => {
                this.confirmAction(retorn, this.ACAO_EDITAR);
                this.closeDialog();
            }, erro => {
                console.log("Erro:", erro.error);
                this.showError(erro, this.ACAO_EDITAR);
            }
        );
    }

    public confirmAction(expense: ExpenseDto, acao: string) {
        let titulo = '';
        let mensagem = '';
        if (acao === this.ACAO_INCLUIR) {
            titulo = 'Adicionado !!';
            mensagem = `${expense.name} foi adicionado na tabela de Gastos!`;
        } else if (acao === this.ACAO_EDITAR) {
            titulo = 'Editado !!';
            mensagem = `${expense.name} foi atualizado na tabela de Gastos!`;
        }
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: titulo,
                mensagem: mensagem,
                textoBotoes: {
                    ok: 'Confirmar',
                },
            },
        });

    }

    showError(erro: Message, acao: string) {
        this.messageService.addConfirmOk(`Erro ao ${acao}, Mensagem: ${erro.message}`);
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };
}
