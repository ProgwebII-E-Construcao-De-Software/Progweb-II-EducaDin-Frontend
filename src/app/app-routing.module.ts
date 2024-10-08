import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./core/home/home.component";


import {goalsRoutes} from "./pages/goals/goals-routing.module";
import {expensesRoutes} from "./pages/expenses/expenses-routing.module";
import {incomesRoutes} from "./pages/incomes/incomes-routing.module";

const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch:'full',
    //     redirectTo: 'home',
    // },
    {
        path:"",
        component: HomeComponent,
        children:[
            ...incomesRoutes,
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