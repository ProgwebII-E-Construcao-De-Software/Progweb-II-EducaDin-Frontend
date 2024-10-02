import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {EarningsDialogComponent} from "../earnings-dialog/earnings-dialog.component";

@Component({
    selector: 'app-earnings-home',
    templateUrl: './earnings-home.component.html',
    styleUrl: './earnings-home.component.scss'
})
export class EarningsHomeComponent {

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: ActivatedRoute
    ) {
    }

    openDialogAddEarnings() {
        const dialogRef = this.dialog.open(EarningsDialogComponent, {
            data: {id: null}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Ganhos', 'Close', {duration: 3000});
            }
        });
    }
}
