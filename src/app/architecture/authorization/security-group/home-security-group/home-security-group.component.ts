import {Component} from '@angular/core';
import {BaseComponent} from "../../../component/base.component";
import {SecurityGroupPaths, SecurityGroupRoles} from "../security-group-routing.module";

@Component({
  selector: 'app-home-security-group',
  templateUrl: './home-security-group.component.html',
  styleUrl: './home-security-group.component.scss'
})
export class HomeSecurityGroupComponent  extends BaseComponent<any>{

  public readonly HAS_PERMISSION_CREATE: boolean;

  constructor() {
    super();
    this.HAS_PERMISSION_CREATE = this.securityService.hasRoles(SecurityGroupRoles.CREATE);
  }

  getBaseURL(): string {
    return "./";
  }

  protected setFormCustomFields(userDto: any): void {
  }

  protected readonly SecurityGroupPaths = SecurityGroupPaths;
  protected readonly SecurityGroupRoles = SecurityGroupRoles;
}
