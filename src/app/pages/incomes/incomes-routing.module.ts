import {Routes} from "@angular/router";
import {IncomesTableComponent} from "./incomes-table/incomes-table.component";
import {IncomesHomeComponent} from "./incomes-home/incomes-home.component";


export const incomesRoutes: Routes = [
    {
        path: "incomes",
        component: IncomesHomeComponent,
        children: [
            {
                path: "",
                component: IncomesTableComponent,
            }
        ]

    }
];