import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterAddComponent} from "./register-add/register-add.component";
import {RouterModule} from "@angular/router";
import {registerRoutes} from "./register-routing.module";
import {MatCardContent, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconButton} from "@angular/material/button";
import {MessageModule} from "../../arquitetura/message/message.module";


@NgModule({
    declarations: [
        RegisterAddComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(registerRoutes),
        MatCardModule,
        MatCardContent,
        MatCardTitle,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MessageModule,
        ReactiveFormsModule,
        MatIconModule,
        FormsModule,
        MatProgressBarModule,
        MatIconButton,
        MatSuffix,
        MessageModule
    ]
})
export class RegisterModule {
}
