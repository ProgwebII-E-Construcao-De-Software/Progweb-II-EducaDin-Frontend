import {Routes} from "@angular/router";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";

export const expensesRoutes: Routes = [
    {
        path: "expenses",
        component: ExpensesTableComponent,
    }
];