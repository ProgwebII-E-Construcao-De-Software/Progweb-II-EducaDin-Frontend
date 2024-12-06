import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ExpenseListDto} from "../../../api/models/expense-list-dto";
import {ExpenseControllerService} from "../../../api/services/expense-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExpensesDialogComponent} from "../expenses-dialog/expenses-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {ExpenseDto} from "../../../api/models/expense-dto";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MessageService} from "../../../arquitetura/message/message.service";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-expenses-table',
    templateUrl: './expenses-table.component.html',
    styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'category', 'description', 'expenseDate', 'amount', 'acao'];
    expensesTableDataSource: MatTableDataSource<ExpenseListDto> = new MatTableDataSource<ExpenseListDto>([]);
    // selection = new SelectionModel<ExpenseListDto>(true, []);
    tipoDeListagem: string = 'Normal';
    isMenuOpen: boolean = false;
    pageSlice!: ExpenseDto[];
    qtdRegistros!: number;
    innerWidth: number = window.innerWidth;
    flexDivAlinhar: string = 'row';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar,
        protected router: ActivatedRoute,
        protected messageService: MessageService,
        public expensesService: ExpenseControllerService,
    ) {
    }

    ngOnInit(): void {
        this.listExpenses();
    }

    public listExpenses() {
        this.expensesService.expenseControllerListAll().subscribe({
            next: (data: ExpenseListDto[]) => {
                this.expensesTableDataSource.data = data.map(item => ({
                    ...item,
                    expenseDate: this.formatDate(item.expenseDate)
                }));
                console.log('Incomes:', this.expensesTableDataSource.data);
            },
            error: (error) => {
                console.error('Erro ao carregar os rendimentos:', error);
            }
        });
    }

    private formatDate(date?: string): string {
        if (!date) return 'Data indisponível';
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }


    removeExpenses(expenses: ExpenseListDto): void {
        if (expenses.id !== undefined) {
            console.log(`Excluir item: ${expenses.description}`);
            this.expensesService.expenseControllerRemove({id: expenses.id})
                .subscribe({
                    next: () => {
                        this.expensesTableDataSource.data = this.expensesTableDataSource.data.filter(item => item.id !== expenses.id);
                        this.messageService.addMsgSuccess(`Ganho "${expenses.name}" excluído com sucesso!`);
                        console.log("Exclusão realizada com sucesso");
                    },
                    error: (error) => {
                        if (error.status === 404) {
                            this.messageService.addMsgInf(`O ganho "${expenses.name}" já foi removido.`);
                        } else {
                            this.messageService.addMsgDanger("Erro ao excluir o ganho. Tente novamente.");
                            console.error("Erro ao excluir:", error);
                        }
                    }
                });
        } else {
            console.error("Erro: o ID do item é indefinido.");
            this.messageService.addMsgDanger("Erro ao excluir: o ID do item é indefinido.");
        }
    }

    confirmDeletionExpenses(expenses: ExpenseListDto) {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Confirmar Exclusão?',
                mensagem: `Deseja realmente excluir o ganho "${expenses.name}" da categoria "${expenses.category?.name}"?`,
                textoBotoes: {
                    ok: 'Excluir',
                    cancel: 'Cancelar',
                },
                dado: expenses
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.removeExpenses(confirmed.dado);
            }
        });
    }

    openDialogEditExpenses(expenses: ExpenseListDto) {
        console.log('Abrindo diálogo de edição para a despesa:', expenses);
        const dialogRef = this.dialog.open(ExpensesDialogComponent, {
            data: {id: expenses}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Diálogo fechado, resultado:', result);
            this.listExpenses();
            if (result) {
                this.snackBar.open('Despesas', 'Close', {duration: 3000});
            }
        });
    }

    onPageChange(event: PageEvent) {
        this.expensesService.expenseControllerListAllPage({
            page: {
                page: event.pageIndex,
                size: event.pageSize,
                sort: ["id"]
            }
        }).subscribe(data => {
            this.expensesTableDataSource.data = data.content || [];
            this.pageSlice = this.expensesTableDataSource.data;
        })
    }

    showResult($event: any[]) {
        this.expensesTableDataSource.data = $event;
    }

    openDialogAddExpenses() {
        const dialogRef = this.dialog.open(ExpensesDialogComponent, {

            data: {id: null}
        });
        dialogRef.afterClosed().subscribe(result =>{
            this.listExpenses();
            if(result){
                this.messageService.addMsgSuccess("Gastos adicionas com sucesso !")
            }
        });
    }

    mudarAlinhar() {

        if (this.innerWidth < 1500) {
            return this.flexDivAlinhar = "column";
        }
        return this.flexDivAlinhar = "row";

    }

}
