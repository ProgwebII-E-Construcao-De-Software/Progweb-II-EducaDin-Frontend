import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ExpensesHomeComponent} from "./expenses-home/expenses-home.component";
import {ExpensesTableComponent} from "./expenses-table/expenses-table.component";
import {
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ExpensesDialogComponent} from "./expenses-dialog/expenses-dialog.component";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {expensesRoutes} from "./expenses-routing.module";


@NgModule({
    declarations: [
        ExpensesHomeComponent,
        ExpensesTableComponent,
        ExpensesDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(expensesRoutes),
        MatCardModule,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatMenuTrigger,
        MatTableModule,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInputModule,
        MatLabel,
        MatOptionModule,
        MatSelectModule,
        MatSuffix,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ExpensesModule {
}
