import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeSecurityUserComponent} from './home-security-user/home-security-user.component';
import {ListSecurityUserComponent} from './list-security-user/list-security-user.component';
import {FormSecurityUserComponent} from './form-security-user/form-security-user.component';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormSecurityUserPhonesComponent} from './form-security-user-phones/form-security-user-phones.component';
import {SharedMaterialModule} from "../../shared-material/shared-material.module";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";


@NgModule({
  declarations: [
    HomeSecurityUserComponent,
    ListSecurityUserComponent,
    FormSecurityUserComponent,
    FormSecurityUserPhonesComponent
  ],
    imports: [
        CommonModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardTitle,
        RouterOutlet,
        RouterLink,
        SharedMaterialModule,
        NgxMaskDirective
    ],
  providers: [provideNgxMask()]
})
export class SecurityUserModule { }
