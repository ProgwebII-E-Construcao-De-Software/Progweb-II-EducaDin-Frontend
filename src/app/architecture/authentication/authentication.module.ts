import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthenticationComponent } from './authentication.component';
import {AuthenticationService} from "./authentication.service";
import {SharedMaterialModule} from "../shared-material/shared-material.module";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {authenticationRoute} from "./authentication-routing.module";
import {MessageModule} from "../message/message.module";
import {MatDialog} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    AuthenticationComponent
  ],
    imports: [
        CommonModule,
        SharedMaterialModule,
        RouterModule.forChild(authenticationRoute),
        MessageModule,
    ],
  providers: [
    AuthenticationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthenticationModule { }
