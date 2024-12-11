import {Routes} from "@angular/router";
import {GoalsTableComponent} from "./goals-table/goals-table.component";
import {GoalsHomeComponent} from "./goals-home/goals-home.component";
import {SecurityGuard} from "../../arquitetura/security/security.guard";

export const goalsRoutes: Routes = [
    {
        path: "goals",
        component: GoalsHomeComponent,
        canActivate: [SecurityGuard],
        children: [
            {
                path: "",
                component: GoalsTableComponent,
            }
        ]
    }
];