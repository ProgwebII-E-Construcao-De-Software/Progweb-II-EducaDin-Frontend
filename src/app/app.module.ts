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
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {ExpensesModule} from "./pages/expenses/expenses.module";
import {GoalsModule} from "./pages/goals/goals.module";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {IncomesModule} from "./pages/incomes/incomes.module";
import {AuthenticationModule} from './arquitetura/authentication/authentication.module';
import {DashboardModule} from "./pages/dashboard/dashboard-module";
import {SettingsModule} from "./pages/settings/settings.module";
import {ForgotpassowordModule} from "./core/forgotpassoword/forgotpassoword.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {ChartModule} from "primeng/chart";
import {MainpainelModule} from "./pages/mainpainel/mainpainel.module";
import {ApiModule} from "./api/api.module";
import {FlexModule} from "@angular/flex-layout";
import {ConfirmationDialog} from "./arquitetura/confirmation-dialog/confirmation-dialog.component";
import {ErrosDialogComponent} from "./arquitetura/erros-dialog/erros-dialog.component";
import {RegisterModule} from "./core/register/register.module";
import {SecurityModule} from "./arquitetura/security/security.module";
import {SecurityInterceptor} from "./arquitetura/security/security.interceptor";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {MessageModule} from "./arquitetura/message/message.module";
import {LoaderDialogComponent} from "./arquitetura/loader-dialog/loader-dialog.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ConfirmationDialog,
        ErrosDialogComponent,
        LoaderDialogComponent
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
        AuthenticationModule,
        RegisterModule,
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
        FlexModule,
        MatDialogModule,
        SecurityModule,
        SecurityModule.forRoot({
            nameStorage: 'portalSSOSecurityStorage',
            loginRouter: '/auth/login'
        }),

    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        provideAnimationsAsync(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SecurityInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SecurityInterceptor,
            multi: true
        },
        {provide: LocationStrategy, useClass: HashLocationStrategy}

    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
