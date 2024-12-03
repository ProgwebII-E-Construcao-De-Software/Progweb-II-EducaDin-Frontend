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
export class HomeComponent implements OnInit {
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

    ngOnInit(): void {
        if(this.securityService.credential.accessToken == ""){
            this.router.navigate(['/auth/login']);
        }else {

            if (this.securityService.isValid()) {
                this.router.navigate(['/dashboard']);
                this.admin = !this.securityService.hasRoles(['ROLE_ADMIN'])
                this.nomeUsuario = this.securityService.credential.userName;

            }
            if (!this.securityService.isValid())
                this.router.navigate(['/painel']);
        }
    }

    logout(): void {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'DESEJA SAIR DO SISTEMA?',
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
