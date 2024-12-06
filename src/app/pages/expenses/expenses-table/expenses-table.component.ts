import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
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
    displayedColumns: string[] = ['select', 'name', 'category', 'description', 'expenseDate', 'amount', 'acao'];
    expensesTableDataSource: MatTableDataSource<ExpenseListDto> = new MatTableDataSource<ExpenseListDto>([]);
    selection = new SelectionModel<ExpenseListDto>(true, []);
    tipoDeListagem: string = 'Normal';
    isMenuOpen: boolean = false;
    pageSlice!: ExpenseDto[];
    qtdRegistros!: number;

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
        this.expensesService.expenseControllerListAll().subscribe(data => {
            this.expensesTableDataSource.data = data;
            console.log(data);
        })
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.expensesTableDataSource.data.length;
        return numSelected === numRows;
    }

    selectAll(event: any) {
        if (event.checked) {
            this.selection.select(...this.expensesTableDataSource.data);
        } else {
            this.selection.clear();
        }
    }

    onCheckboxChange(expenses: ExpenseListDto) {
        this.selection.toggle(expenses);
    }

    removeExpenses(expenses: ExpenseListDto): void {
        if (expenses.id !== undefined) {
            console.log(`Excluir item: ${expenses.description}`);
            this.expensesService.expenseControllerRemove({id: expenses.id})
                .subscribe(
                    retorn => {
                        this.listExpenses();
                        this.messageService.addMsgSuccess(`Despesa: ${retorn.name} Excluída com Sucesso !!`)
                        console.log("Exclusão", retorn);
                    },
                    error => {
                        if (error.status === 404) {
                            this.messageService.addMsgInf("Despesa listada não existe mais")
                        } else {
                            this.messageService.addMsgDanger("Erro ao excluir");
                            console.log("Erro:", error);
                        }
                    }
                );
        } else {
            console.error("Erro: o ID do item é indefinido.");
            alert("Erro ao Excluir: o ID do item é indefinido.");
        }
    }

    confirmDeletionExpenses(expenses: ExpenseListDto) {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Confirmar Exclusão?',
                mensagem: `A exclusão de: ${expenses.name} Categoria: ${expenses.category?.name}?`,
                textoBotoes: {
                    ok: 'Confirmar',
                    cancel: 'Cancelar',
                },
                dado: expenses
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.removeExpenses(confirmed.dado);
                this.snackBar.open('Excluido com Sucesso', 'Close', {duration: 4000});
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

    onPageChange(event: PageEvent){
        this.expensesService.expenseControllerListAllPage({page: {page: event.pageIndex, size: event.pageSize, sort:["pessoaCpf"]}}).subscribe(data => {
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
    }
}
