import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {ExpensesDialogComponent} from "../expenses-dialog/expenses-dialog.component";
import {ExpenseControllerService} from "../../../api/services/expense-controller.service";
import {MatTableDataSource} from "@angular/material/table";
import {ExpenseListDto} from "../../../api/models/expense-list-dto";

@Component({
    selector: 'app-expenses-home',
    templateUrl: './expenses-home.component.html',
    styleUrl: './expenses-home.component.scss'
})
export class ExpensesHomeComponent {

    constructor(
        public dialog: MatDialog,
        public router: ActivatedRoute,
    ) {
    }

    openDialogAddExpenses() {
        const dialogRef = this.dialog.open(ExpensesDialogComponent, {

            data: {id: null}
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.snackBar.open('Gastos', 'Close', {duration: 3000});
        //     }
        // });
    }
}
