import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EarningsTableComponent} from "./components/earnings/earnings-table/earnings-table.component";


export const routes: Routes = [
  { path: '', component:  EarningsTableComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
