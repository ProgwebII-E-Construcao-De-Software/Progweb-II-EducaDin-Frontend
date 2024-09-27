import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {goalsRoutes} from "./goals-routing.module";
import {GoalsHomeComponent} from "./goals-home/goals-home.component";
import {GoalsTableComponent} from "./goals-table/goals-table.component";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";


@NgModule({
    declarations: [
        GoalsHomeComponent,
        GoalsTableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(goalsRoutes),
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon
    ]
})
export class GoalsModule {
}
