import {Routes} from '@angular/router';
import {SecurityGuard} from "../../security/security.guard";
import {CrudActionEnum} from "../../component/curd-action";
import {HomeSecurityUserComponent} from "./home-security-user/home-security-user.component";
import {ListSecurityUserComponent} from "./list-security-user/list-security-user.component";
import {FormSecurityUserComponent} from "./form-security-user/form-security-user.component";

export enum SecurityUserRoles {
  LIST = 'ROLE_SECURITYUSER_READ_ALL',
  ACTIVATE_INACTIVATE = "ROLE_SECURITYUSER_ACTIVATE_INACTIVATE",
  BLOCK_UNBLOCK = "ROLE_SECURITYUSER_BLOCK_UNBLOCK",
  CREATE = "ROLE_SECURITYUSER_CREATE",
  DELETE = "ROLE_SECURITYUSER_DELETE",
  READ = "ROLE_SECURITYUSER_READ",
  READ_ALL = "ROLE_SECURITYUSER_READ_ALL",
  SEARCH = "ROLE_SECURITYUSER_SEARCH",
  UPDATE = "ROLE_SECURITYUSER_UPDATE",
}

export enum SecurityUserPaths {
  BASE = 'security-user',
  RELATIVE_LIST = 'list',
  RELATIVE_NEW = 'new',
  RELATIVE_VIEW = 'view',
  RELATIVE_EDIT = 'edit',
  LIST = '/'+BASE+'/'+RELATIVE_LIST,
  NEW = '/'+BASE+'/'+RELATIVE_NEW

}

export const securityUserRoutes: Routes = [
  {
    path: SecurityUserPaths.BASE,
    component: HomeSecurityUserComponent,
    canActivate: [
      SecurityGuard
    ],
    children: [
      {
        path: SecurityUserPaths.RELATIVE_LIST,
        component: ListSecurityUserComponent,
        data: {
          security: {roles: [SecurityUserRoles.LIST]},
          crud_action: CrudActionEnum.LIST,
        }
      },
      {
        path: SecurityUserPaths.RELATIVE_NEW,
        component: FormSecurityUserComponent,
        data: {
          security: {roles: [SecurityUserRoles.CREATE]},
          crud_action: CrudActionEnum.CREATE,
        },
      },
      {
        path: ':id/'+SecurityUserPaths.RELATIVE_VIEW,
        component: FormSecurityUserComponent,
        data: {
          security: {roles: [SecurityUserRoles.CREATE]},
          crud_action: CrudActionEnum.VIEW,
        },
      },
      {
        path: ':id/'+SecurityUserPaths.RELATIVE_EDIT,
        component: FormSecurityUserComponent,
        data: {
          security: {roles: [SecurityUserRoles.UPDATE]},
          crud_action: CrudActionEnum.ALTER,
        },
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: SecurityUserPaths.RELATIVE_LIST
      },
    ]
  }
];
