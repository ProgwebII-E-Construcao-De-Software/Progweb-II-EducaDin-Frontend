import {Routes} from "@angular/router";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";
import {ExpensesDialogComponent} from "./expenses-dialog/expenses-dialog.component";
import {EarningsHomeComponent} from "../earnings/earnings-home/earnings-home.component";
import {EarningsTableComponent} from "../earnings/earnings-table/earnings-table.component";

export const earningsRoutes: Routes = [
  {
    path: "expenses",
    component: ExpensesHomeComponent,
    children: [
      {
        path: "",
        component: ExpensesTableComponent,
      }
    ]

  }
];
