import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {NotificationListComponent} from "./notifications.list/notifications.list.component";

@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class NotificationsModule {}
