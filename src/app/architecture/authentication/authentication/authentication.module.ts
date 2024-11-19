import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutes } from './authentication.routing';


@NgModule({
  declarations: [
    AuthenticationComponent
  ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
    ],
  providers: [
  
  ]
})
export class AuthenticationModule {
}
