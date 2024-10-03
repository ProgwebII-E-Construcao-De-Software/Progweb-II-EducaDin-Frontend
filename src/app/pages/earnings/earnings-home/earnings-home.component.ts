import {Component} from '@angular/core';
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
export class EarningsHomeComponent extends EarningsTableComponent{

    constructor(
        dialog: MatDialog,
        snackBar: MatSnackBar,
        router: ActivatedRoute,
        messageService: MessageService,
        earningsService: IncomeControllerService,
    ) {
        super(dialog, snackBar, router, messageService, earningsService)
    }

    openDialogAddEarnings() {
        const dialogRef = this.dialog.open(EarningsDialogComponent, {
            data: {id: null}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.listEarnings();
            if (result) {
                this.snackBar.open('Ganhos', 'Close', {duration: 3000});
            }
        });
    }
}
