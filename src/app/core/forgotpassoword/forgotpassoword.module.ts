import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotpassowordComponent} from "./forgotpassoword.dialog/forgotpassoword.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        ForgotpassowordComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterOutlet,
        RouterLink,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
    ]
})
export class ForgotpassowordModule {
}
