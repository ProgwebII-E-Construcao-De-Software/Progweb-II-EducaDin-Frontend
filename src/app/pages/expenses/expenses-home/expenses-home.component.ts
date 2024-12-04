import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

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

}
