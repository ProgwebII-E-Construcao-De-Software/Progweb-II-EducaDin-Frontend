import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialog} from "../../arquitetura/confirmation-dialog/confirmation-dialog.component";
import {SecurityService} from "../../arquitetura/security/security.service";
import {NotificationsListComponent} from "../../pages/notifications/notifications.list/notifications.list.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    admin!:boolean;
    public nomeUsuario: String = "";
    route!: string;
    notificationsCount: number=0;

    constructor(
        private observer: BreakpointObserver,
        private router: Router,
        protected securityService: SecurityService,
        private dialog: MatDialog
    ) {}


    logout(): void {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Deseja Sair do Sistema?',
                textoBotoes: { ok: 'Sim', cancel: 'Não' },
            },
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed?.resultado) {
                this.securityService.invalidate();
                this.router.navigate(['/painel']);
            }
        });
    }

    openNotifications(): void {
      this.dialog.open(NotificationsListComponent, {
        width: '400px',
        height: 'auto',
      })
    }
}
