import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotificationsListComponent} from "./notifications.list/notifications.list.component";



export const notificationsRoutes: Routes = [
  { path: '', component: NotificationsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(notificationsRoutes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
