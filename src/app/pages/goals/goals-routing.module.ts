import {Routes} from "@angular/router";
import {GoalsTableComponent} from "./goals-table/goals-table.component";

export const goalsRoutes: Routes = [
    {
        path: "goals",
        component: GoalsTableComponent,
    }
];