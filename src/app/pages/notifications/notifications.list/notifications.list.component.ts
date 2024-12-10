import { Component, OnInit } from '@angular/core';
import { NotificationPreferenceControllerService } from '../../../api/services/notification-preference-controller.service';
import { NotificationControllerService } from '../../../api/services/notification-controller.service';
import { NotificationPreferenceDto } from '../../../api/models/notification-preference-dto';
import { NotificationDto } from '../../../api/models/notification-dto';
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.list.component.html',
  styleUrls: ['./notifications.list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  preferences: NotificationPreferenceDto[] = [];
  notifications: NotificationDto[] = [];
  isLoading = false;

  constructor(
    private preferenceService: NotificationPreferenceControllerService,
    private notificationService: NotificationControllerService
  ) {}

  ngOnInit(): void {
    this.loadPreferences();
  }

  loadPreferences(): void {
    this.isLoading = true;
    this.preferenceService.notificationPreferenceControllerListAll().subscribe({
      next: (data) => {
        this.preferences = data.filter(pref => pref.enabled); // Apenas as habilitadas
        this.generateNotifications();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao carregar preferências:', err);
      }
    });
  }

  // Gerar notificações com base nas preferências habilitadas
    generateNotifications(): void {
        const notificationsRequests = this.preferences.map(preference => {
            const notification: NotificationDto = {
                id: 0,
                userId: 1, // ID do usuário logado
                type: preference.type,
                message: `Você tem uma nova notificação do tipo: ${preference.type}`,
                createdAt: new Date().toISOString()
            };

            return this.notificationService.createNotification({ body: notification });
        });

        forkJoin(notificationsRequests).subscribe({
            next: (responses) => {
                this.notifications = responses;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Erro ao criar notificações:', err);
            }
        });
    }

}
