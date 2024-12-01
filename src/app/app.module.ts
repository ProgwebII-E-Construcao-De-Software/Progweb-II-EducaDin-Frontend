import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./core/home/home.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {ExpensesModule} from "./pages/expenses/expenses.module";
import {GoalsModule} from "./pages/goals/goals.module";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MessageModule} from "./architecture/message/message.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {IncomesModule} from "./pages/incomes/incomes.module";
import {SharedMaterialModule} from "./architecture/shared-material/shared-material.module";
import {AuthenticationModule} from './architecture/authentication/authentication.module';
import {DashboardModule} from "./pages/dashboard/dashboard-module";
import {SettingsModule} from "./pages/settings/settings.module";
import {ForgotpassowordModule} from "./core/forgotpassoword/forgotpassoword.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {ChartModule} from "primeng/chart";
import {SecurityModule} from "./architecture/security/security.module";
import {MainpainelModule} from "./pages/mainpainel/mainpainel.module";
import {ApiModule} from "./api/api.module";
import {environment} from "./environments/environment";
import {ConfirmDialog} from "primeng/confirmdialog";
import {ConfirmationDialog} from "./architecture/confirmation-dialog/confirmation-dialog.component";
import {ErrosDialogComponent} from "./architecture/erros-dialog/erros-dialog.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ConfirmationDialog,
        ErrosDialogComponent
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
        AppRoutingModule,
        SharedMaterialModule,
        AuthenticationModule,
        ForgotpassowordModule,
        DashboardModule,
        SettingsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        ChartModule,
        MainpainelModule,
        SecurityModule.forRoot({
            nameStorage: environment.nameStorage,
            loginRouter: '/auth/login'
        }),
        ApiModule.forRoot({rootUrl: environment.apiUrl}),

    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        provideAnimationsAsync(),

        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AppInterceptor,
        //     multi: true
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: SecurityInterceptor,
        //     multi: true
        // },
        // SecurityService,
        // { provide: config, useValue: config },
        // {provide: LocationStrategy, useClass: HashLocationStrategy},

    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
