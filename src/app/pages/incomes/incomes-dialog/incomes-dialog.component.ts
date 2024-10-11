import {Component, Inject, Injectable, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeControllerService} from "../../../api/services/income-controller.service";
import {Message, MessageService} from "../../../architecture/message/message.service";
import {IncomeDto} from "../../../api/models/income-dto";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../architecture/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";
import {CategoryDto} from "../../../api/models/category-dto";
import {CategoryControllerService} from "../../../api/services/category-controller.service";
import {IncomesTableComponent} from "../incomes-table/incomes-table.component";

@Component({
    selector: 'app-earnings-dialog',
    templateUrl: './incomes-dialog.component.html',
    styleUrls: ['./incomes-dialog.component.scss']
})

@Injectable({
    providedIn: 'root',
})

export class IncomesDialogComponent implements OnInit {

    categorias: CategoryDto[] = [];
    formGroup!: FormGroup;
    public readonly ACAO_INCLUIR = "Adicionar Ganhos";
    public readonly ACAO_EDITAR = "Editar Ganhos";
    acao: string = this.ACAO_INCLUIR;
    id!: number;
    income!: IncomeDto;

    constructor(
        public dialogRef: MatDialogRef<IncomesDialogComponent>,
        private formBuilder: FormBuilder,
        public incomeService: IncomeControllerService,
        private categoryService: CategoryControllerService,
        private messageService: MessageService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private incomesTable: IncomesTableComponent,
        private _adapter: DateAdapter<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log('Dados recebidos no diálogo:', this.data);
        this.id = data.id;
        this.creatForm();
        this._adapter.setLocale('pt-br');
    }

    ngOnInit(): void {
        this.getCategories();
        if (this.id) {
            console.log('ID do ganho a ser editado:', this.id);
            this.acao = this.ACAO_EDITAR;
            this.editIncomes(this.id);
        }  else {
            console.log('Nenhum ID foi passado, modo de criação ativado.');
        }
    }

    // private loadCategorys() {
    //     this.categoryService.listAll2().subscribe(categories => {
    //             this.categorias = categories;
    //         }, error => {
    //             this.messageService.addMsgWarning(`Erro ao carregar categorias: ${error.message}`);
    //         }
    //     )
    // }

    public creatForm() {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            categoryName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            incomeDate: [new Date(), Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            repeatable: ['DONT_REPEATS', Validators.required],
            leadTime: [0, [Validators.min(0), Validators.max(100)]],
        });
    }
    private getCategories(){
    this.categoryService.getIncomeCategories().subscribe(
      (categories: CategoryDto[]) => {
        this.categorias = categories;
        console.log("Categorias carregadas:", this.categorias);
      }
      );
    }
    private editIncomes(id: number) {
        this.incomeService.getById({id}).subscribe(
            retorn => {
                console.log("retorno", retorn);
                this.formGroup.patchValue({
                    name: retorn.name ?? null,
                    categoryName: retorn.categoryName ?? null,
                    description: retorn.description ?? null,
                    incomeDate: retorn.incomeDate ? new Date(retorn.incomeDate) : new Date(),
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
            if (this.id) {
                this.editingIncomes();
            } else {
                this.includeIncomes();
            }
        }
    }

    private includeIncomes() {
        if (this.formGroup.valid) {
            let incomeDto: IncomeDto = this.formGroup.value;
            console.log("Dados a serem enviados:", this.formGroup.value);
            this.incomeService.create({body: incomeDto}).subscribe(
                retorn => {
                    console.log("Retorno da criação:", retorn);
                    this.confirmAction(retorn, this.ACAO_INCLUIR);
                    window.location.reload();
                    this.snackBar.open('Ganhos Adicionado', 'Close', {duration: 4000});
                }, erro => {
                    console.log("Erro ao criar o ganho:", erro);
                    this.messageService.addMsgWarning(`Erro ao criar ganho: ${erro.message}`);
                }
            );
        }
    }


    private editingIncomes() {
        const formData: IncomeDto = this.formGroup.value;
        console.log("Dados:", formData);
        this.incomeService.update({id: this.id, body: formData}).subscribe(
            retorn => {
                console.log("Earnings updated successfully:", retorn);
                this.confirmAction(retorn, this.ACAO_EDITAR);
                this.snackBar.open('Ganhos Editado', 'Close', {duration: 4000});
            }, erro => {
                console.log("Erro:", erro.error);
                this.showError(erro, this.ACAO_EDITAR);
            }
        );
    }

    public confirmAction(incomes: IncomeDto, acao: string) {
        let titulo = '';
        let mensagem = '';
        if (acao === this.ACAO_INCLUIR) {
            titulo = 'Adicionado !!';
            mensagem = `${incomes.name} foi adicionado na tabela de Ganhos!`;
        } else if (acao === this.ACAO_EDITAR) {
            titulo = 'Editado !!';
            mensagem = `${incomes.name} foi atualizado na tabela de Ganhos!`;
        }
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: titulo,
                mensagem: mensagem,
                textoBotoes: {
                    ok: 'Confirmar',
                },
                dado: incomes
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.closeDialog(true);
            }
        });
    }

    showError(erro: Message, acao: string) {
        this.messageService.addConfirmOk(`Erro ao ${acao}, Mensagem: ${erro.message}`);
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };
}
