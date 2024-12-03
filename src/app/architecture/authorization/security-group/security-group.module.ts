import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSecurityGroupComponent } from './form-security-group/form-security-group.component';
import { HomeSecurityGroupComponent } from './home-security-group/home-security-group.component';
import { ListSecurityGroupComponent } from './list-security-group/list-security-group.component';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SharedMaterialModule} from "../../shared-material/shared-material.module";



@NgModule({
  declarations: [
    FormSecurityGroupComponent,
    HomeSecurityGroupComponent,
    ListSecurityGroupComponent
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
  ]
})
export class SecurityGroupModule { }
