import {Routes} from "@angular/router";
import {EarningsTableComponent} from "./earnings-table/earnings-table.component";
import {EarningsHomeComponent} from "./earnings-home/earnings-home.component";


export const earningsRoutes: Routes = [
    {
        path: "earnings",
        component: EarningsHomeComponent,
        children:[
            {
                path:"",
                component:EarningsTableComponent,
            }
        ]

    }
];