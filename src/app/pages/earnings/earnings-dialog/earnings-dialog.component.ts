import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IncomeControllerService } from "../../../api/services/income-controller.service";
import {Message, MessageService} from "../../../architecture/message/message.service";
import { IncomeDto } from "../../../api/models/income-dto";
import {ConfirmationDialog} from "../../../architecture/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter} from "@angular/material/core";
import {CategoryDto} from "../../../api/models/category-dto";
import {CategoryControllerService} from "../../../api/services/category-controller.service";

@Component({
    selector: 'app-earnings-dialog',
    templateUrl: './earnings-dialog.component.html',
    styleUrls: ['./earnings-dialog.component.scss']
})

@Injectable({
    providedIn: 'root',
})

export class EarningsDialogComponent implements OnInit {
    //categoria!: String;
    categorias: CategoryDto[] = [];
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
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private _adapter: DateAdapter<any>,
        private categoryService: CategoryControllerService,
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
            repeatable: ['DONT_REPEATS', Validators.required],
            leadTime: [0, Validators.min(0)],
        });
    }

    private getCategories(){
      this.categoryService.getIncomeCategories().subscribe(
        (categories: CategoryDto[]) => {
          this.categorias = categories;
          console.log("Categorias carregadas:", this.categorias);
        }
        /*(error) => {
          console.log("Erro ao carregar categorias:", error);
          this.messageService.addMsgWarning("Erro ao carregar categorias.");
        }*/
      );
    }
    private editEarnings(id: number) {
        this.earningService.getById({ id }).subscribe(
            retorn => {
                console.log("retorno", retorn);
                this.formGroup.patchValue({
                    name: retorn.name ? retorn.name : null,
                    categoryName: retorn.categoryName ? retorn.categoryName : null,
                    description: retorn.description ? retorn.description : null,
                    incomeDate: retorn.incomeDate ? new Date(retorn.incomeDate) : new Date(),
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

    public confirmAction(earnings: IncomeDto, acao: string) {
        let titulo = '';
        let mensagem ='';
        if (acao === this.ACAO_INCLUIR) {
            titulo = 'Adicionado !!';
            mensagem = `${earnings.name} foi adicionado na tabela de Ganhos!`;
        } else if (acao === this.ACAO_EDITAR) {
            titulo = 'Editado !!';
            mensagem = `${earnings.name} foi atualizado na tabela de Ganhos!`;
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
