import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotificationListComponent} from "./notifications.list/notifications.list.component";



const routes: Routes = [
  { path: '', component: NotificationListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
