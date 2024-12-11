import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IncomeControllerService } from "../../../api/services/income-controller.service";
import { IncomeDto } from "../../../api/models/income-dto";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DateAdapter } from "@angular/material/core";
import { MessageService } from "../../../arquitetura/message/message.service";
import { ConfirmDialogComponent } from "../../../arquitetura/message/confirm-mesage/confirm-dialog.component";
import { ConfirmationDialogResult } from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
    selector: 'app-incomes-dialog',
    templateUrl: './incomes-dialog.component.html',
    styleUrls: ['./incomes-dialog.component.scss']
})

export class IncomesDialogComponent implements OnInit {

    formGroup!: FormGroup;
    categorias: string[] = ['Aulas Particulares',
        'Aluguel de Imóveis',
        'Bolsas de Estudo',
        'Comissões',
        'Consultoria',
        'Crowdfunding',
        'Freelance',
        'Gestão Financeira Pessoal',
        'Investimentos',
        'Investimentos em Criptomoedas',
        'Lucros de Empresas',
        'Marketing de Afiliados',
        'Participação em Lucros',
        'Prêmios e Sorteios',
        'Produção de Conteúdo',
        'Renda de Atividades Criativas',
        'Renda de Atividades Recreativas',
        'Renda de Consultorias Online',
        'Renda de Cursos Online',
        'Renda de Eventos',
        'Renda de Fotografia',
        'Renda de Licenciamento',
        'Renda de Mídias Sociais',
        'Renda de Música',
        'Renda de Podcasts',
        'Renda de Vídeo',
        'Renda de Webinars',
        'Renda Passiva',
        'Receitas de Mídias Sociais',
        'Royalties',
        'Salário',
        'Serviços de Redação',
        'Trabalho Autônomo',
        'Trabalho de Mãe/Pai',
        'Trabalho Temporário',
        'Vendas de Produtos',
        'Venda de Artesanato',
        'Venda de Livros',
        'Venda de Produtos Digitais',
        'Outros Ganhos'];
    public readonly ACAO_INCLUIR = "Adicionar Ganhos";
    public readonly ACAO_EDITAR = "Editar Ganhos";
    acao: string = this.ACAO_INCLUIR;
    id!: number;

    constructor(
        public dialogRef: MatDialogRef<IncomesDialogComponent>,
        private formBuilder: FormBuilder,
        private incomeService: IncomeControllerService,
        private messageService: MessageService,
        private dialog: MatDialog,
        private router: ActivatedRoute,
        private snackBar: MatSnackBar,
        private _adapter: DateAdapter<any>,
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.id = data.id || null;
        this._adapter.setLocale('pt-br');
    }

    ngOnInit(): void {
        this.initializeForm();
        if (this.id) {
            this.acao = this.ACAO_EDITAR;
            this.loadIncomeData(this.id);
        }
    }

    private initializeForm() {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            categoryName: [null, [Validators.required]],
            description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            incomeDate: [new Date(), Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            repeatable: ['DONT_REPEATS', Validators.required],
            leadTime: [0, [Validators.min(0), Validators.max(100)]],
        });
    }

    private loadIncomeData(id: number) {
        this.incomeService.incomeControllerGetById({ id }).subscribe({
            next: (income: IncomeDto) => {
                this.formGroup.patchValue({
                    ...income,
                    incomeDate: income.incomeDate ? new Date(income.incomeDate) : new Date(),
                });
            },
            error: (error) => {
                this.messageService.addMsgWarning(`Erro ao buscar ganho: ${error.message}`);
            }
        });
    }

    public closeDialog(reload: boolean = false): void {
        this.dialogRef.close(reload);
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            this.id ? this.updateIncome() : this.createIncome();
        }
    }

    private createIncome() {
        const incomeDto: IncomeDto = {
            ...this.formGroup.value,
            userId: this.getUserIdFromSession(),
        };
        console.log("o que retorna",incomeDto);

        this.incomeService.incomeControllerCreate({ body: incomeDto }).subscribe({
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

    private updateIncome() {
        const updatedIncome: IncomeDto = {
            id: this.id,
            ...this.formGroup.value,
            userId: this.getUserIdFromSession(),
            incomeDate: new Date(this.formGroup.value.incomeDate).toISOString()
        };
        console.log('atualização:', updatedIncome);
        this.incomeService.incomeControllerUpdate({ id: this.id, body: updatedIncome }).subscribe({
            next: (response: IncomeDto) => {
                if (response && response.name) {
                    this.showConfirmation(response, this.ACAO_EDITAR);
                    this.snackBar.open('Ganho atualizado com sucesso!', 'Fechar', { duration: 4000 });
                    this.closeDialog(true);
                } else {
                    console.warn('Objeto de resposta vazio ou inválido:', response);
                    this.messageService.addMsgWarning('O ganho foi atualizado, mas o servidor não retornou os dados corretamente.');
                    const fallbackResponse: IncomeDto = {
                        id: this.id,
                        ...this.formGroup.value
                    };
                    this.showConfirmation(fallbackResponse, this.ACAO_EDITAR);
                    this.closeDialog(true);
                }
            },
            error: (error) => {
                this.messageService.addMsgWarning(`Erro ao atualizar ganho: ${error.message}`);
            }
        });
    }



    private showConfirmation(income: IncomeDto, action: string) {
        if (!income || !income.name) {
            console.error('Objeto de ganho inválido:', income);
            this.messageService.addMsgWarning('Erro ao processar a confirmação. Dados do ganho ausentes.');
            return;
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                titulo: action === this.ACAO_INCLUIR ? 'Adicionado' : 'Editado',
                mensagem: `${income.name} foi ${action === this.ACAO_INCLUIR ? 'adicionado' : 'atualizado'} com sucesso!`,
                textoBotoes: { ok: 'Confirmar' },
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.closeDialog(true);
            }
        });
    }


    private getUserIdFromSession(){
        const userId = this.securityService.getUserId();
        console.log("o que retorna",userId);
        return userId;

    }

    public handleError(controlName: string, errorName: string) {
        return this.formGroup.controls[controlName].hasError(errorName);
    }
}
