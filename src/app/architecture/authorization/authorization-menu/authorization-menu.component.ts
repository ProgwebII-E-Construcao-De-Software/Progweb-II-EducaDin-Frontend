import {Component} from '@angular/core';
import {SecurityService} from "../../security/security.service";
import {AuthorizationPaths} from "../authorization-routing.module";
import {SecurityUserRoles} from "../security-user/security-user-routing.module";
import {SecurityGroupRoles} from "../security-group/security-group-routing.module";

@Component({
  selector: 'authorization-menu',
  templateUrl: './authorization-menu.component.html',
  styleUrl: './authorization-menu.component.scss'
})
export class AuthorizationMenuComponent {
  adminMenuOpen: boolean = false;
  public readonly routeLinkSecurityUser : string = AuthorizationPaths.SECURITY_USER;
  public readonly routeLinkSecurityGroup: string = AuthorizationPaths.SECURITY_GROUP;
  public readonly routeLinkDocumentation: string = AuthorizationPaths.DOCUMENTATION;

  public readonly HAS_SECURITYUSER_ACCESS: boolean;
  public readonly HAS_SECURITYGROUP_ACCESS: boolean;

  constructor(public securityService: SecurityService) {
    this.HAS_SECURITYUSER_ACCESS = securityService.hasRoles([SecurityUserRoles.SEARCH,SecurityUserRoles.READ]);
    this.HAS_SECURITYGROUP_ACCESS = securityService.hasRoles([SecurityGroupRoles.SEARCH,SecurityGroupRoles.READ]);
  }

  toggleAdminMenu() {
    this.adminMenuOpen = !this.adminMenuOpen;
  }

}
