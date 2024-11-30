import {RouterModule, RouterOutlet} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {AuthenticationComponent} from './authentication-component/authentication.component';
import {authenticationRoutes} from './authentication.routing';
import {AuthenticationHomeComponent} from "./authentication-home/authentication-home.component";


@NgModule({
    declarations: [
        AuthenticationComponent,
        AuthenticationHomeComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        RouterModule.forChild(authenticationRoutes),
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        RouterOutlet
    ],
    providers: []
})
export class AuthenticationModule {
}
