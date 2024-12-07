import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {goalsRoutes} from "./goals-routing.module";
import {GoalsHomeComponent} from "./goals-home/goals-home.component";
import {GoalsTableComponent} from "./goals-table/goals-table.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {GoalsDialogComponent} from "./goals-dialog/goals-dialog.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";


@NgModule({
    declarations: [
        GoalsHomeComponent,
        GoalsTableComponent,
        GoalsDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(goalsRoutes),
        MatButton,
        MatTableModule,
        MatSortModule,
        MatNativeDateModule,
        MatIcon,
        MatIconButton,
        MatPaginatorModule,
        MatCheckbox,
        MatCardModule,
        MatMenuModule,
        FlexLayoutModule,
        SearchModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenu,
        MatMenuItem,
    ]
})
export class GoalsModule {
}
