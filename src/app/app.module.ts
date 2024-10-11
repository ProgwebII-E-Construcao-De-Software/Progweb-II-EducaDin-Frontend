import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./core/home/home.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {ExpensesModule} from "./pages/expenses/expenses.module";
import {GoalsModule} from "./pages/goals/goals.module";
import {ConfirmationDialog} from "./architecture/confirmation-dialog/confirmation-dialog.component";
import {ErrosDialogComponent} from "./architecture/erros-dialog/erros-dialog.component";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MessageModule} from "./architecture/message/message.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {IncomesModule} from "./pages/incomes/incomes.module";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ConfirmationDialog,
        ErrosDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MessageModule.forRoot(),
        IncomesModule,
        ExpensesModule,
        GoalsModule,
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        provideAnimationsAsync(),
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
