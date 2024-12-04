import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SecurityService } from '../../architecture/security/security.service';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialog} from "../../architecture/confirmation-dialog/confirmation-dialog.component";

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
}
