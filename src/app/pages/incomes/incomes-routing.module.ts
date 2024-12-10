import {Routes} from "@angular/router";
import {IncomesTableComponent} from "./incomes-table/incomes-table.component";
import {IncomesHomeComponent} from "./incomes-home/incomes-home.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";


export const incomesRoutes: Routes = [
    {
        path: "incomes",
        component: IncomesHomeComponent,
        canActivate: [SecurityGuard],
        children: [
            {
                path: "",
                component: IncomesTableComponent,
            }
        ]

    }
];