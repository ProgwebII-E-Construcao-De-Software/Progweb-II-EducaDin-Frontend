import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorizationMenuComponent} from './authorization-menu/authorization-menu.component';
import {SharedMaterialModule} from "../shared-material/shared-material.module";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {authorizationRoutes} from "./authorization-routing.module";
import {SecurityUserModule} from "./security-user/security-user.module";
import {SecurityGroupModule} from "./security-group/security-group.module";
import {DocumentationModule} from "./documentation/documentation.module";


@NgModule({
  declarations: [
    AuthorizationMenuComponent
  ],
  exports: [
    AuthorizationMenuComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SecurityUserModule,
    SecurityGroupModule,
    DocumentationModule,
    RouterModule.forChild(authorizationRoutes),
    RouterLink,
    RouterOutlet
  ]
})
export class AuthorizationModule { }
