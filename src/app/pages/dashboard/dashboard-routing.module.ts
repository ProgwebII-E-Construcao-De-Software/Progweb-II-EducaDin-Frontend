import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard-component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const dashboardRoutes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [SecurityGuard],
    }
]