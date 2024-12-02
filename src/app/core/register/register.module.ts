import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterAddComponent} from "./register-add/register-add.component";
import {RouterModule} from "@angular/router";
import {registerRoutes} from "./register-routing.module";
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MessageModule} from "../../architecture/message/message.module";
import {NbSharedModule} from "@nebular/theme/components/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";


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
        MatProgressBarModule
    ]
})
export class RegisterModule {
}
