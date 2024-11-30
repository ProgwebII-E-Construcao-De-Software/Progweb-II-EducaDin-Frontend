import {Component, Injectable, OnInit} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {IncomeListDto} from "../../../api/models/income-list-dto";
import {IncomeControllerService} from "../../../api/services/income-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "../../../architecture/message/message.service";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../architecture/confirmation-dialog/confirmation-dialog.component";
import {IncomesDialogComponent} from "../incomes-dialog/incomes-dialog.component";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-earnings-table',
    templateUrl: './incomes-table.component.html',
    styleUrls: ['./incomes-table.component.scss']
})

@Injectable({
    providedIn: 'root',
})

export class IncomesTableComponent implements OnInit {
    displayedColumns: string[] = ['select','name', 'category', 'description', 'incomeDate', 'amount', 'acao'];
    incomeTableDataSource: MatTableDataSource<IncomeListDto> = new MatTableDataSource<IncomeListDto>([]);
    selection = new SelectionModel<IncomeListDto>(true, []);
    tipoDeListagem: string = 'Normal';
    isMenuOpen: boolean = false;

    constructor(
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar,
        protected router: ActivatedRoute,
        protected messageService: MessageService,
        public incomeService: IncomeControllerService,
    ) {

    }

    ngOnInit(): void {
        this.listIncomes();
    }

    public listIncomes() {
        this.incomeService.incomeControllerListAll().subscribe(data => {
            this.incomeTableDataSource.data = data;
            console.log(data);
        })
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.incomeTableDataSource.data.length;
        return numSelected === numRows;
    }


    selectAll(event: any) {
        if (event.checked) {
            this.selection.select(...this.incomeTableDataSource.data);
        } else {
            this.selection.clear();
        }
    }


    onCheckboxChange(incomes: IncomeListDto) {
        this.selection.toggle(incomes);
    }

    removeIncomes(incomes: IncomeListDto): void {
        if (incomes.id !== undefined) {
            console.log(`Excluir item: ${incomes.description}`);
            this.incomeService.incomeControllerRemove({id: incomes.id})
                .subscribe(
                    retorn => {
                        this.listIncomes();
                        this.messageService.addMsgSuccess(`Ganho: ${retorn.name} Excluído com Sucesso !!`)
                        console.log("Exclusão", retorn);
                    },
                    error => {
                        if (error.status === 404) {
                            this.messageService.addMsgInf("Ganho listado não existe mais")
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

    confirmDeletionIncomes(incomes: IncomeListDto) {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Confirmar Exclusão?',
                mensagem: `A exclusão de: ${incomes.name} Categoria: ${incomes.category?.name}?`,
                textoBotoes: {
                    ok: 'Confirmar',
                    cancel: 'Cancelar',
                },
                dado: incomes
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.removeIncomes(confirmed.dado);
                this.snackBar.open('Excluido com Sucesso', 'Close', {duration: 4000});
            }
        });
    }

    openDialogEditIncomes(incomes: IncomeListDto) {
        console.log('Abrindo diálogo de edição para o ganho:', incomes);
        const dialogRef = this.dialog.open(IncomesDialogComponent, {
            data: {id: incomes}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Diálogo fechado, resultado:', result);
            this.listIncomes();
            if (result) {
                this.snackBar.open('Ganhos', 'Close', {duration: 3000});
            }
        });
    }
}
