import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";
import {goalsRoutes} from "./pages/goals/goals-routing.module";
import {expensesRoutes} from "./pages/expenses/expenses-routing.module";
import {incomesRoutes} from "./pages/incomes/incomes-routing.module";
import {AuthenticationRoutes} from './architecture/authentication/authentication/authentication.routing';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            ...incomesRoutes,
            ...expensesRoutes,
            ...goalsRoutes,

        ]

    },
    {
        path: "access",
        children: [
            ...AuthenticationRoutes,
        ]

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
