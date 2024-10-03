import {Component, OnInit} from '@angular/core';
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
import {EarningsDialogComponent} from "../earnings-dialog/earnings-dialog.component";

@Component({
    selector: 'app-earnings-table',
    templateUrl: './earnings-table.component.html',
    styleUrls: ['./earnings-table.component.scss']
})
export class EarningsTableComponent implements OnInit {
    displayedColumns: string[] = ['select', 'category', 'description', 'incomeDate', 'amount', 'acao'];
    earningsTableDataSource: MatTableDataSource<IncomeListDto> = new MatTableDataSource<IncomeListDto>([]);
    selection = new SelectionModel<IncomeListDto>(true, []);
    tipoDeListagem: string = 'Normal';
    isMenuOpen: boolean = false;

    constructor(
        public earningsService: IncomeControllerService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private messageService: MessageService
    ) {

    }

    ngOnInit(): void {
        this.listEarnings();
    }

    listEarnings() {
        this.earningsService.listAll().subscribe(data => {
            this.earningsTableDataSource.data = data;
            console.log(data);
        })
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.earningsTableDataSource.data.length;
        return numSelected === numRows;
    }


    selectAll(event: any) {
        if (event.checked) {
            this.selection.select(...this.earningsTableDataSource.data);
        } else {
            this.selection.clear();
        }
    }


    onCheckboxChange(earnings: IncomeListDto) {
        this.selection.toggle(earnings);
    }

    removeEarnings(earnings: IncomeListDto): void {
        if (earnings.id !== undefined) {
            console.log(`Excluir item: ${earnings.description}`);
            this.earningsService.remove({id: earnings.id})
                .subscribe(
                    retorn => {
                        this.listEarnings();
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

    confirmDeletionEarnings(earnings: IncomeListDto) {

        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Confirmar Exclusão?',
                mensagem: `A exclusão de: ${earnings.name} Categoria: ${earnings.category?.name}?`,
                textoBotoes: {
                    ok: 'Confirmar',
                    cancel: 'Cancelar',
                },
                dado: earnings
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.removeEarnings(confirmed.dado);
            }
        });
    }

    openDialogEditEarnings(earnings: IncomeListDto) {
        console.log('Abrindo diálogo de edição para o ganho:', earnings);
        const dialogRef = this.dialog.open(EarningsDialogComponent, {
            data: {id: earnings}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Diálogo fechado, resultado:', result);
            this.listEarnings();
            if (result) {
                this.snackBar.open('Ganhos', 'Close', {duration: 3000});
            }
        });
    }
}
