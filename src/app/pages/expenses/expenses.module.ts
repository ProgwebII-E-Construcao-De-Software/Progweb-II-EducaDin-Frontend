import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {expensesRoutes} from "./expenses-routing.module";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {ExpensesDialogComponent} from "./expenses-dialog/expenses-dialog.component";


@NgModule({
    declarations: [
        ExpensesHomeComponent,
        ExpensesTableComponent,
        ExpensesDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(expensesRoutes),
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon
    ]
})
export class ExpensesModule {
}
