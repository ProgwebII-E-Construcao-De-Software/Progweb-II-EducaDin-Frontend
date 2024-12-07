import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationControllerService} from "../../../api/services/notification-controller.service";

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
    notifications: any[] = [];
    unreadCount: number = 0;

    constructor(private http: HttpClient,
                private notificationService: NotificationControllerService,

    ) {
    }

    ngOnInit(): void {
        this.loadNotifications();
        this.creatNotification();
    }

    loadNotifications(): void {

    }

    public creatNotification() {
        this.notifications.forEach((notification) => {
            this.notificationService.createNotification({body: notification.id}).subscribe(

            );
        });
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
