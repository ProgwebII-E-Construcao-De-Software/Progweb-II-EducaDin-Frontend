import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GanhoListComponent} from "./ganhos/ganho-list/ganho-list.component";
import {GanhoFormComponent} from "./ganhos/ganho-form/ganho-form.component";

export const routes: Routes = [
  { path: '', redirectTo: '/ganhos', pathMatch: 'full' },
  { path: 'ganhos', component: GanhoListComponent },
  { path: 'ganhos/novo', component: GanhoFormComponent },
  { path: 'ganhos/editar/:id', component: GanhoFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
