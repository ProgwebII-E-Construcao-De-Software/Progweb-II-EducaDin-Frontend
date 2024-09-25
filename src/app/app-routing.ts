import { Routes} from '@angular/router';
import {EarningsTableComponent} from "./components/earnings/earnings-table/earnings-table.component";
import {EarningsFormComponent} from "./components/earnings/earnings-form/earnings-form.component";
import {ExpensesTableComponent} from "./components/expenses/expenses-table/expenses-table.component";
import {GoalsTableComponent} from "./components/goals/goals-table/goals-table.component";
import {HomeComponent} from "./core/home/home.component";
import {SettingsComponent} from "./core/settings/settings.component";


export const routes: Routes =[
    {path:'home', component: HomeComponent},
    {path: 'tableEarnings', component: EarningsTableComponent},
    {path: 'newEarnings', component: EarningsFormComponent},
    {path: 'tableExpenses', component:ExpensesTableComponent},
    {path: 'tableGoals', component:GoalsTableComponent},
    {path: 'settings', component: SettingsComponent},
];

export class AppRouting {

}
