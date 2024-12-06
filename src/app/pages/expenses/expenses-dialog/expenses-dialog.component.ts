import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseControllerService} from "../../../api/services/expense-controller.service";
import {ExpenseDto} from "../../../api/models/expense-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";
import {Message, MessageService} from "../../../arquitetura/message/message.service";
import {ConfirmDialogComponent} from "../../../arquitetura/message/confirm-mesage/confirm-dialog.component";

@Component({
    selector: 'app-expenses-dialog',
    templateUrl: './expenses-dialog.component.html',
    styleUrls: ['./expenses-dialog.component.scss']
})
export class ExpensesDialogComponent implements OnInit {
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
        this.id = data.id || null;
        this.creatForm();
        this._adapter.setLocale('pt-br');
    }

    ngOnInit(): void {
        this.creatForm();
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
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            categoryName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            expenseDate: [new Date(), Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            repeatable: ['DONT_REPEATS', Validators.required],
            leadTime: [0, [Validators.min(0), Validators.max(100)]],
        });
    }

    private editExpense(id: number) {
        this.expenseService.expenseControllerGetById({id}).subscribe(
            retorn => {
                console.log("retorno", retorn);
                this.formGroup.patchValue({
                    name: retorn.name ?? null,
                    categoryName: retorn.categoryName ?? null,
                    description: retorn.description ?? null,
                    expenseDate: retorn.expenseDate ? new Date(retorn.expenseDate) : new Date(),
                    amount: retorn.amount ?? null,
                    repeatable: retorn.repeatable ?? 'DONT_REPEATS',
                    leadTime: retorn.leadTime ?? 0
                });
            }, error => {
                console.log("erro", error);
                this.messageService.addMsgWarning(`Erro ao buscar ID: ${id}, mensagem: ${error.message}`);
            }
        );
    }

    public closeDialog(reload: boolean = false): void {
        this.dialogRef.close(reload);
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            this.id ? this.updateExpense() : this.includeExpense();
        }
    }

    private includeExpense() {
        const expenseDto: ExpenseDto = {
            ...this.formGroup.value,
            userId: this.getUserIdFromSession(),
        };

        if (this.formGroup.valid) {
            console.log("Dados:", this.formGroup.value);
            this.expenseService.expenseControllerCreate({body: this.formGroup.value}).subscribe({
                next: (response) => {
                    this.showConfirmation(response, this.ACAO_INCLUIR);
                    this.snackBar.open('Ganho adicionado com sucesso!', 'Fechar', { duration: 4000 });
                    this.closeDialog(true);
                },
                error: (error) => {
                    this.messageService.addMsgWarning(`Erro ao adicionar ganho: ${error.message}`);
                }
            });
        }
    }

    private updateExpense() {
        const updatedExpense: ExpenseDto = {
            id: this.id,
            ...this.formGroup.value,
            userId: this.getUserIdFromSession(),
            expenseDate: new Date(this.formGroup.value.expenseDate).toISOString()
        };
        console.log('atualização:', updatedExpense);
        this.expenseService.expenseControllerUpdate({ id: this.id, body: updatedExpense }).subscribe({
            next: (response: ExpenseDto) => {
                if (response && response.name) {
                    this.showConfirmation(response, this.ACAO_EDITAR);
                    this.closeDialog(true);
                } else {
                    console.warn('Objeto de resposta vazio ou inválido:', response);
                    this.messageService.addMsgWarning('O gastos foi atualizado, mas o servidor não retornou os dados corretamente.');
                    const fallbackResponse: ExpenseDto = {
                        id: this.id,
                        ...this.formGroup.value
                    };
                    this.showConfirmation(fallbackResponse, this.ACAO_EDITAR);
                    this.closeDialog(true);
                }
            },
            error: (error) => {
                this.messageService.addMsgWarning(`Erro ao atualizar gastos: ${error.message}`);
            }
        });
    }

    private showConfirmation(expense: ExpenseDto, action: string) {
        if (!expense || !expense.name) {
            console.error('Objeto de ganho inválido:', expense);
            this.messageService.addMsgWarning('Erro ao processar a confirmação. Dados do ganho ausentes.');
            return;
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                titulo: action === this.ACAO_INCLUIR ? 'Adicionado' : 'Editado',
                mensagem: `${expense.name} foi ${action === this.ACAO_INCLUIR ? 'adicionado' : 'atualizado'} com sucesso!`,
                textoBotoes: { ok: 'Confirmar' },
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.closeDialog(true);
            }
        });
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

    private getUserIdFromSession(): number {
        return 1;
    }
}
