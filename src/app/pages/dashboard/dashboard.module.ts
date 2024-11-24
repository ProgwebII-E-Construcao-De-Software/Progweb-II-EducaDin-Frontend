import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouterModule} from "@angular/router";
import {dashboardRoutes} from "./dashboard-routing.module";


@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(dashboardRoutes),

    ]
})
export class DashboardModule {
}
