import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageDialog, MessageItem, MessageService} from "./message/message.service";
import {ConfirmDialogComponent} from "./message/confirm-mesage/confirm-dialog.component";
import {LoaderService} from "./loader/loader.service";
import {LoaderDialogComponent} from "./loader/loader-dialog/loader-dialog.component";
import {SecurityService} from "./security/security.service";
import {Router} from "@angular/router";
import {User} from "./security/User";
import {GenericDialogComponent} from "./message/generic-dialog/generic-dialog.component";
import {AuthApiService} from "../api/services/auth-api.service";
import {CredencialDto} from "../api/models/credencial-dto";

@Injectable({
  providedIn: 'root'
})
export class ArchitectureService {

  private dialogLoaderRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private securityService: SecurityService,
    private authenticationService: AuthApiService,
    ) { }

  init(): void {
    this.initLoaderIntercept();
    this.securityService.init();
    this.messageService.getConfirmEmitter().subscribe((item: MessageItem) => this.addConfirmItem(item));
    this.messageService.getDialogEmitter().subscribe((item: MessageDialog) => this.addDialogItem(item));

    this.configureSecurityActions();

  }

  private addConfirmItem(item: MessageItem): void {
    this.dialog.open(ConfirmDialogComponent, {
      minWidth: '30%',
      minHeight: '30%',
      disableClose: true,
      data: {item}
    });
  }

  private addDialogItem(item: MessageDialog): void {
    this.dialog.open(GenericDialogComponent, {
      minWidth: item.width,
      minHeight: item.height,
      disableClose: true,
      data: {item}
    });
  }

  private initLoaderIntercept(){
    this.loaderService.onStart.subscribe(() => {
      this.dialogLoaderRef = this.dialog.open(LoaderDialogComponent, {
        minWidth: '50px',
        minHeight: '50px',
        hasBackdrop: true,
        disableClose: true
      });
    });

    this.loaderService.onStop.subscribe(() => {
      if (this.dialogLoaderRef !== undefined) {
        this.dialogLoaderRef.close();
      }
    });
  }

  /**
   * Configura as ações de refresh (do token),de Forbiden, Unauthorized
   *
   * @private
   */
  private configureSecurityActions(): void {
      this.securityService.onRefresh.subscribe((refreshToken: string) => {
          this.authenticationService.refresh({ refreshToken }).subscribe({
              next: (data: CredencialDto[]) => {
                  if (data && data.length > 0) {
                      // Obtém o primeiro objeto da lista retornada
                      const credencial = data[0];

                      const user: User = {
                          id: credencial.id || 0,
                          name: credencial.name || '',
                          login: credencial.login || '',
                          expiresIn: credencial.expiresIn || 3600,
                          accessToken: credencial.accessToken || '',
                          refreshToken: credencial.refreshToken || '',
                          roles: credencial.roles || []
                      };

                      // Inicializa o usuário com os dados obtidos
                      this.securityService.init(user);
                  } else {
                      console.warn('Nenhuma credencial válida recebida.');
                  }
              },
              error: (error: any) => {
                  console.error('Erro ao atualizar o token:', error);
                  this.messageService.addMsgInf('Erro ao atualizar o token. Por favor, tente novamente.');
              }
          });
      });

      this.securityService.onForbidden.subscribe(() => {
          this.messageService.addMsgWarning('Sem acesso.');
          const loginRoute = this.securityService.securityConfig?.loginRouter || '/login';
          this.router.navigate([loginRoute]);
      });

      this.securityService.onUnauthorized.subscribe(() => {
          this.messageService.addMsgWarning('Não autorizado!');
          this.router.navigate(['/']);
      });
  }


}
