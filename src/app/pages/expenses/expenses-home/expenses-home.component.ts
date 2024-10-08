import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {ExpensesDialogComponent} from "../expenses-dialog/expenses-dialog.component";

@Component({
  selector: 'app-expenses-home',
  templateUrl: './expenses-home.component.html',
  styleUrl: './expenses-home.component.scss'
})
export class ExpensesHomeComponent {
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: ActivatedRoute
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
