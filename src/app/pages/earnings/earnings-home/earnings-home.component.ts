import {Component, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {EarningsDialogComponent} from "../earnings-dialog/earnings-dialog.component";
import {EarningsTableComponent} from "../earnings-table/earnings-table.component";
import {MessageService} from "../../../architecture/message/message.service";
import {IncomeControllerService} from "../../../api/services/income-controller.service";

@Component({
    selector: 'app-earnings-home',
    templateUrl: './earnings-home.component.html',
    styleUrl: './earnings-home.component.scss'
})

@Injectable({
    providedIn: 'root',
})

export class EarningsHomeComponent {

    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public router: ActivatedRoute,
        public messageService: MessageService,
        public earningsService: IncomeControllerService,
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
