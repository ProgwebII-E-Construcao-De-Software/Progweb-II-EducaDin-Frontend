import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {NotificationsListComponent} from "./notifications.list/notifications.list.component";

@NgModule({
  declarations: [NotificationsListComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [NotificationsListComponent],
})
export class NotificationsModule {}
