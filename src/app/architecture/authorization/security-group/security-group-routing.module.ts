import {Routes} from '@angular/router';
import {SecurityGuard} from "../../security/security.guard";
import {CrudActionEnum} from "../../component/curd-action";
import {HomeSecurityGroupComponent} from "./home-security-group/home-security-group.component";
import {ListSecurityGroupComponent} from "./list-security-group/list-security-group.component";
import {FormSecurityGroupComponent} from "./form-security-group/form-security-group.component";

export enum SecurityGroupRoles {
  LIST = 'ROLE_SECURITYGROUP_READ_ALL',
  ACTIVATE_INACTIVATE = "ROLE_SECURITYGROUP_ACTIVATE_INACTIVATE",
  CREATE = "ROLE_SECURITYGROUP_CREATE",
  DELETE = "ROLE_SECURITYGROUP_DELETE",
  READ = "ROLE_SECURITYGROUP_READ",
  READ_ALL = "ROLE_SECURITYGROUP_READ_ALL",
  SEARCH = "ROLE_SECURITYGROUP_SEARCH",
  UPDATE = "ROLE_SECURITYGROUP_UPDATE",
}

export enum SecurityGroupPaths {
  BASE = 'security-group',
  RELATIVE_LIST = 'list',
  RELATIVE_NEW = 'new',
  RELATIVE_VIEW = 'view',
  RELATIVE_EDIT = 'edit',
  LIST = '/'+BASE+'/'+RELATIVE_LIST,
  NEW = '/'+BASE+'/'+RELATIVE_NEW

}

export const securityGroupRoutes: Routes = [
  {
    path: SecurityGroupPaths.BASE,
    component: HomeSecurityGroupComponent,
    canActivate: [
      SecurityGuard
    ],
    children: [
      {
        path: SecurityGroupPaths.RELATIVE_LIST,
        component: ListSecurityGroupComponent,
        data: {
          security: {roles: [SecurityGroupRoles.LIST]},
          crud_action: CrudActionEnum.LIST,
        }
      },
      {
        path: SecurityGroupPaths.RELATIVE_NEW,
        component: FormSecurityGroupComponent,
        data: {
          security: {roles: [SecurityGroupRoles.CREATE]},
          crud_action: CrudActionEnum.CREATE,
        },
      },
      {
        path: ':id/'+SecurityGroupPaths.RELATIVE_VIEW,
        component: FormSecurityGroupComponent,
        data: {
          security: {roles: [SecurityGroupRoles.CREATE]},
          crud_action: CrudActionEnum.VIEW,
        },
      },
      {
        path: ':id/'+SecurityGroupPaths.RELATIVE_EDIT,
        component: FormSecurityGroupComponent,
        data: {
          security: {roles: [SecurityGroupRoles.UPDATE]},
          crud_action: CrudActionEnum.ALTER,
        },
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: SecurityGroupPaths.RELATIVE_LIST
      },
    ]
  }
];
