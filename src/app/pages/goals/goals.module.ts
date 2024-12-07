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
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {GoalsDialogComponent} from "./goals-dialog/goals-dialog.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgxMaskDirective} from "ngx-mask";


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
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatNativeDateModule,
        MatIcon,
        MatIconButton,
        MatPaginator,
        MatTable,
        MatCheckbox,
        MatCardModule,
        MatCardActions,
        FlexLayoutModule,
        SearchModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class GoalsModule {
}
