import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {earningsRoutes} from "./earnings-routing.module";
import {EarningsTableComponent} from "./earnings-table/earnings-table.component";
import {EarningsHomeComponent} from "./earnings-home/earnings-home.component";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {EarningsDialogComponent} from "./earnings-dialog/earnings-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContainer,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatRadioButton} from "@angular/material/radio";
import {MatNativeDateModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
    declarations: [
        EarningsHomeComponent,
        EarningsTableComponent,
        EarningsDialogComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterModule.forChild(earningsRoutes),
        MatMenuModule,
        MatMenuTrigger,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogActions,
        MatDialogContent,
        MatDialogClose,
        MatDialogTitle,
        MatSelectModule,
        MatDatepickerToggle,
        MatDatepicker,
        MatOption,
        MatDatepickerInput,
        MatRadioButton,
        ReactiveFormsModule,
        MatDialogContainer,
        MatNativeDateModule,
        MatAutocompleteModule,
        AsyncPipe,
        MatCheckboxModule,
    ]
})
export class EarningsModule {
}
