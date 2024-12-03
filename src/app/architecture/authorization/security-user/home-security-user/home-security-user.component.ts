import {ChangeDetectorRef, Component} from '@angular/core';
import {BaseComponent} from "../../../component/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CrudActionService} from "../../../component/crud-action.service";
import {MessageService} from "../../../message/message.service";
import {ErrorService} from "../../../error.service";
import {FormBuilder} from "@angular/forms";
import {SecurityService} from "../../../security/security.service";
import {SecurityUserPaths, SecurityUserRoles} from "../security-user-routing.module";

@Component({
  selector: 'app-home-security-user',
  templateUrl: './home-security-user.component.html',
  styleUrl: './home-security-user.component.scss'
})
export class HomeSecurityUserComponent  extends BaseComponent<any>{

  public readonly HAS_PERMISSION_CREATE: boolean;

  constructor() {
    super();
    this.HAS_PERMISSION_CREATE = this.securityService.hasRoles(SecurityUserRoles.CREATE);
  }

  getBaseURL(): string {
    return "./";
  }

  protected setFormCustomFields(userDto: any): void {
  }

  protected readonly SecurityUserPaths = SecurityUserPaths;
  protected readonly SecurityUserRoles = SecurityUserRoles;
}
