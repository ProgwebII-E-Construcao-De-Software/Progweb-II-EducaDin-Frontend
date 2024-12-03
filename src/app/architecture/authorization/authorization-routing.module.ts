import {Routes} from '@angular/router';
import {SecurityGuard} from "../security/security.guard";
import {SecurityUserPaths, securityUserRoutes} from "./security-user/security-user-routing.module";
import {SecurityGroupPaths, securityGroupRoutes} from "./security-group/security-group-routing.module";
import {DocumentationPaths, documentationRoutes} from "./documentation/documentation-routing.module";

export enum AuthorizationPaths {
  BASE = 'authorization',
  SECURITY_USER = '/'+BASE+'/'+SecurityUserPaths.BASE,
  SECURITY_GROUP = '/'+BASE+'/'+SecurityGroupPaths.BASE,
  DOCUMENTATION = '/'+BASE+'/'+DocumentationPaths.BASE
}

export const authorizationRoutes: Routes = [
  {
    path: AuthorizationPaths.BASE.valueOf(),
    canActivate: [
      SecurityGuard
    ],
    children: [
      ...securityUserRoutes,
      ...securityGroupRoutes,
      ...documentationRoutes
    ]
  }
];
