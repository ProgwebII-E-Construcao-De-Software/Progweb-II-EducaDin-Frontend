import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {goalsRoutes} from "./goals-routing.module";
import {GoalsHomeComponent} from "./goals-home/goals-home.component";
import {GoalsTableComponent} from "./goals-table/goals-table.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";


@NgModule({
    declarations: [
        GoalsHomeComponent,
        GoalsTableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(goalsRoutes),
        MatButton,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon,
        MatIconButton,
        MatPaginator,
        MatTable,
        MatCheckbox,
        MatCardModule,
        MatCardActions
    ]
})
export class GoalsModule {
}
