import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {earningsRoutes} from "./earnings-routing.module";
import {EarningsTableComponent} from "./earnings-table/earnings-table.component";
import {EarningsHomeComponent} from "./earnings-home/earnings-home.component";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";


@NgModule({
    declarations: [
        EarningsHomeComponent,
        EarningsTableComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        RouterModule.forChild(earningsRoutes)
    ]
})
export class EarningsModule {
}
