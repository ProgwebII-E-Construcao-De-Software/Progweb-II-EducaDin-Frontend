import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";
import {goalsRoutes} from "./pages/goals/goals-routing.module";
import {expensesRoutes} from "./pages/expenses/expenses-routing.module";
import {incomesRoutes} from "./pages/incomes/incomes-routing.module";
import {authenticationRoutes} from './architecture/authentication/authentication.routing';
import {dashboardRoutes} from "./pages/dashboard/dashboard-routing.module";
import {settingsRoutes} from "./pages/settings/settings-routing.module";
import {mainpainelRoutes} from "./pages/mainpainel/mainpainel-routing.module";


const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        children: [
            ...authenticationRoutes,
            ...mainpainelRoutes,
            ...incomesRoutes,
            ...expensesRoutes,
            ...goalsRoutes,
            ...dashboardRoutes,
            ...settingsRoutes,
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ]

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
