import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";
import {goalsRoutes} from "./pages/goals/goals-routing.module";
import {expensesRoutes} from "./pages/expenses/expenses-routing.module";
import {incomesRoutes} from "./pages/incomes/incomes-routing.module";
import {dashboardRoutes} from "./pages/dashboard/dashboard-routing.module";
import {settingsRoutes} from "./pages/settings/settings-routing.module";
import {mainpainelRoutes} from "./pages/mainpainel/mainpainel-routing.module";
import {authenticationRoute} from "./architecture/authentication/authentication-routing.module";


const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            ...mainpainelRoutes,
            ...incomesRoutes,
            ...expensesRoutes,
            ...goalsRoutes,
            ...dashboardRoutes,
            ...settingsRoutes,
            { path: '', redirectTo: '/painel', pathMatch: 'full' },
        ]

    },
    {
        path: "auth",
        children: [
            ...authenticationRoute
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
