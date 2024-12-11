import {Routes} from "@angular/router";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const expensesRoutes: Routes = [
    {
        path: "expenses",
        component: ExpensesHomeComponent,
        canActivate: [SecurityGuard],
        children: [
            {
                path: "",
                component: ExpensesTableComponent,
            }
        ]

    }
];
