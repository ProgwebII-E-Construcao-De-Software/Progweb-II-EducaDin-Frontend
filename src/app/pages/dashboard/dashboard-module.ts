import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard-component";
import {RouterModule} from "@angular/router";
import {dashboardRoutes} from "./dashboard-routing.module";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {ChartModule} from "primeng/chart";
import {DashboardDoughnutComponent} from "./dashboard-doughnut/dashboard-doughnut-component";
import {DashboardPieComponent} from "./dashboard-pie/dashboard-pie.component";
import {DashboardStackedBarComponent} from "./dashboard-stacked-bar/dashboard-stacked-bar.component";


@NgModule({
    declarations: [
        DashboardComponent,
        DashboardDoughnutComponent,
        DashboardPieComponent,
        DashboardStackedBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(dashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatCardModule,
        ChartModule,
    ]
})
export class DashboardModule {
}
