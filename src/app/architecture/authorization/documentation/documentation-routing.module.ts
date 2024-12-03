import {Routes} from '@angular/router';
import {SecurityGuard} from "../../security/security.guard";
import {CrudActionEnum} from "../../component/curd-action";
import {DocumentationComponent} from "./documentation.component";


export enum DocumentationPaths {
  BASE = 'documentation',

}

export const documentationRoutes: Routes = [
  {
    path: DocumentationPaths.BASE,
    component: DocumentationComponent
  }
];
