import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouterModule} from "@angular/router";
import {dashboardRoutes} from "./dashboard-routing.module";
import {MatOptionModule} from "@angular/material/core";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxEchartsModule} from "ngx-echarts";
import {MatCardModule} from "@angular/material/card";
import {DashboardBarComponent} from "./dashboard/dashboard-bar.component";


@NgModule({
    declarations: [
        DashboardComponent,
        DashboardBarComponent
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
        NgxEchartsModule,
    ]
})
export class DashboardModule {
}
