import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";
import {earningsRoutes} from "./pages/earnings/earnings-routing.module";
import {expensesRoutes} from "./pages/expenses/expenses-routing.module";
import {goalsRoutes} from "./pages/goals/goals-routing.module";

const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo: 'home',
    },
    {
        path:"",
        component: HomeComponent,
        children:[
            ...earningsRoutes,
            ...expensesRoutes,
            ...goalsRoutes,

        ]

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}