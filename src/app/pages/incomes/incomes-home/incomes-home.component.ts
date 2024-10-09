import {Component, Injectable, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../architecture/message/message.service";
import {IncomeControllerService} from "../../../api/services/income-controller.service";
import {IncomesDialogComponent} from "../incomes-dialog/incomes-dialog.component";

@Component({
    selector: 'app-earnings-home',
    templateUrl: './incomes-home.component.html',
    styleUrl: './incomes-home.component.scss'
})

@Injectable({
    providedIn: 'root',
})

export class IncomesHomeComponent {


    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public router: ActivatedRoute,
        public messageService: MessageService,
        public incomeService: IncomeControllerService,
    ) {

    }

    openDialogAddIncomes() {
        const dialogRef = this.dialog.open(IncomesDialogComponent, {
            data: {id: null}
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.snackBar.open('Ganhos Adicionado', 'Close', {duration: 3000});
        //
        //     }
        // });
    }
}
