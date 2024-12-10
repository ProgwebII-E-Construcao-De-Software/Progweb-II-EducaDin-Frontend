import { Component, OnInit } from '@angular/core';
import { NotificationPreferenceControllerService } from '../../../api/services/notification-preference-controller.service';
import { NotificationControllerService } from '../../../api/services/notification-controller.service';
import { NotificationPreferenceDto } from '../../../api/models/notification-preference-dto';
import { NotificationDto } from '../../../api/models/notification-dto';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.list.component.html',
  styleUrls: ['./notifications.list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  preferences: NotificationPreferenceDto[] = [];
  notifications: NotificationDto[] = [];
  isMenuOpen: boolean = false;

  constructor(
    private preferenceService: NotificationPreferenceControllerService,
    private notificationService: NotificationControllerService
  ) {}

  ngOnInit(): void {
    this.loadPreferences();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  // Carregar preferências de notificações
  loadPreferences(): void {

    this.preferenceService.notificationPreferenceControllerListAll().subscribe({
      next: (data) => {
        this.preferences = data.filter(pref => pref.enabled); // Apenas as habilitadas
        this.generateNotifications();
      },
      error: (err) => {
        // this.isLoading = false;
        console.error('Erro ao carregar preferências:', err);
      }
    });
  }

  // Gerar notificações com base nas preferências habilitadas
  generateNotifications(): void {
    this.preferences.forEach(preference => {
      const notification: NotificationDto = {
        id: 0,
        userId: 1, // ID do usuário logado
        type: preference.type,
        message: `Você tem uma nova notificação do tipo: ${preference.type}`,
        createdAt: new Date().toISOString()
      };

      // Simular o envio de notificações
      this.notificationService.createNotification({ body: notification }).subscribe({
        next: (data) => {
          this.notifications.push(data);
          // this.isLoading = false;
        },
        error: (err) => {
          // this.isLoading = false;
          console.error('Erro ao criar notificação:', err);
        }
      });
    });
  }
}
