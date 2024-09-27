import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {expensesRoutes} from "./expenses-routing.module";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";


@NgModule({
    declarations: [
        ExpensesHomeComponent,
        ExpensesTableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(expensesRoutes)
    ]
})
export class ExpensesModule {
}
