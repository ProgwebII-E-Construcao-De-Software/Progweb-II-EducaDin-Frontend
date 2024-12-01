import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {ArchitectureService} from "./architecture.service";
import {MessageService} from "./message/message.service";
import {MessageModule} from "./message/message.module";
import {LoaderModule} from "./loader/loader.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {SecurityInterceptor} from "./security/security.interceptor";
import {HttpErrorInterceptor} from "./http-error.interceptor";
import {AuthorizationModule} from "./authorization/authorization.module";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {getPtBrPaginatorIntl} from "./component/portuguese-mat-paginator-intl";
import {MomentDatePipe} from "./pipes/moment-date.pipe";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

const MY_DATE_FORMATS: MatDateFormats  = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    MomentDatePipe
  ],
  imports: [
    CommonModule,
    MessageModule,
    LoaderModule,
    AuthenticationModule,
    AuthorizationModule,
  ],
  exports:[
    MomentDatePipe,
    AuthorizationModule
  ],
  providers: [
    ArchitectureService,
    MessageService,
    //Para conexão http, e o withInterceptorsFromDi (possibilita a injeção dos interceptors)
    provideHttpClient(withInterceptorsFromDi()),
    //Alteração de comportamento do MAT_FORM_FIELD de forma global
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    //Interceptor para tratar erro no http request
    {provide: HTTP_INTERCEPTORS,              useClass: HttpErrorInterceptor, multi: true},
    //Interceptor para incluir token autenticação nas requisições.
    {provide: HTTP_INTERCEPTORS,              useClass: SecurityInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: MAT_DATE_LOCALE, useValue: 'pt_br'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl()}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ArchitectureModule { }
