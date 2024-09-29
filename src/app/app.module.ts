import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./core/home/home.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatTooltip} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {EarningsModule} from "./pages/earnings/earnings.module";
import {ExpensesModule} from "./pages/expenses/expenses.module";
import {GoalsModule} from "./pages/goals/goals.module";
import {ConfirmationDialog} from "./architecture/confirmation-dialog/confirmation-dialog.component";
import {ErrosDialogComponent} from "./architecture/erros-dialog/erros-dialog.component";

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
        MatTooltip,
        MatDialogModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        EarningsModule,
        ExpensesModule,
        GoalsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
