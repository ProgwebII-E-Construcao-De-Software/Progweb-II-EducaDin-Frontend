import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  unreadCount: number = 0;
  apiUrl = 'http://localhost:8080/api/notifications'; // URL da API de notificações
  private notificationService: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.notifications = data;
        this.unreadCount = data.length; // Exemplo: considerar todas como não lidas inicialmente
      },
      (error) => {
        console.error('Erro ao carregar notificações:', error);
      }
    );
  }

  public markAsRead() {
    this.notifications.forEach((notification) => {
      this.notificationService.markAsRead({ id: notification.id }).subscribe(
        () => {
          this.unreadCount--; // Decrementa o contador
        },
        (error) => {
          console.error(`Erro ao marcar notificação ${notification.id} como lida`, error);
        }
      );
    });
    this.unreadCount = 0;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'custo':
        return 'attach_money';
      case 'gasto':
        return 'shopping_cart';
      case 'metas':
        return 'flag';
      default:
        return 'notifications';
    }
  }
}
