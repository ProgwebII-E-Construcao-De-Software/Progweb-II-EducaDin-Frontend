import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
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
import {MatIconModule} from "@angular/material/icon";
import {ExpensesDialogComponent} from "./expenses-dialog/expenses-dialog.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContainer,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule, MatOption} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {expensesRoutes} from "./expenses-routing.module";
import {MatRadioButton} from "@angular/material/radio";
import {MatPaginator} from "@angular/material/paginator";
import {SearchModule} from "../../arquitetura/search-module/search.module";
import {FlexLayoutModule} from "@angular/flex-layout";


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
        FormsModule,
        MatDialogClose,
        MatOption,
        MatRadioButton,
        MatDialogContainer,
        MatNativeDateModule,
        MatAutocompleteModule,
        AsyncPipe,
        MatPaginator,
        SearchModule,
        FlexLayoutModule,
    ]
})
export class ExpensesModule {
}
