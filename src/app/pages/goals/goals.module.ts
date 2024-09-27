import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {goalsRoutes} from "./goals-routing.module";
import {GoalsHomeComponent} from "./goals-home/goals-home.component";
import {GoalsTableComponent} from "./goals-table/goals-table.component";


@NgModule({
    declarations: [
        GoalsHomeComponent,
        GoalsTableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(goalsRoutes)
    ]
})
export class GoalsModule {
}
