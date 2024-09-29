import {Routes} from "@angular/router";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";
import {ExpensesDialogComponent} from "./expenses-dialog/expenses-dialog.component";


export const expensesRoutes: Routes = [
    {
        path: "expenses",
        component: ExpensesHomeComponent,
        children: [
            {
                path: "",
                component: ExpensesTableComponent,
            },
            {
                path:"addExpenses",
                component:ExpensesDialogComponent,
            }
        ]
    }
];