import {Routes} from "@angular/router";
import {EarningsTableComponent} from "./earnings-table/earnings-table.component";
import {EarningsHomeComponent} from "./earnings-home/earnings-home.component";
import {EarningsDialogComponent} from "./earnings-dialog/earnings-dialog.component";


export const earningsRoutes: Routes = [
    {
        path: "earnings",
        component: EarningsHomeComponent,
        children: [
            {
                path: "",
                component: EarningsTableComponent,
            }
        ]

    }
];