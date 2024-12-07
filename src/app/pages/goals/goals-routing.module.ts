import {Routes} from "@angular/router";
import {GoalsTableComponent} from "./goals-table/goals-table.component";
import {GoalsHomeComponent} from "./goals-home/goals-home.component";

export const goalsRoutes: Routes = [
    {
        path: "goals",
        component: GoalsHomeComponent,
        children: [
            {
                path: "",
                component: GoalsTableComponent,
            }
        ]
    }
];