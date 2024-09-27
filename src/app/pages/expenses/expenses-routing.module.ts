import {Routes} from "@angular/router";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";

export const expensesRoutes: Routes = [
    {
        path: "expenses",
        component: ExpensesHomeComponent,
    }
];