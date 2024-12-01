import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterAddComponent} from "./register-add/register-add.component";
import {RouterModule} from "@angular/router";
import {registerRoutes} from "./register-routing.module";


@NgModule({
    declarations: [
        RegisterAddComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(registerRoutes),
    ]
})
export class RegisterModule {
}
