import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SecurityService } from './security.service';
import { config, IConfig } from './config';

@Injectable()
export class SecurityGuard implements CanActivate {

    constructor(
        private router: Router,
        private securityService: SecurityService,
        @Inject(config) private config: IConfig
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // Verifica se o usuário está autenticado
        if (this.securityService.isValid()) {
            // Recupera o userId do serviço de segurança
            const userId = this.securityService.getUserId();

            // Verifica se o userId está presente e é válido
            if (userId && userId > 0) {
                const roles = next.data['security'] ? next.data['security'].roles : [];

                // Verifica se o usuário tem os papéis necessários
                if (this.securityService.hasRoles(roles)) {
                    return true; // Autorizado
                } else {
                    // Acesso negado por papéis inadequados
                    this.securityService.onForbidden.emit(this.securityService.credential);
                    this.router.navigate(['/']);
                }
            } else {
                // Redireciona para login se o userId não estiver disponível
                console.error('UserId inválido ou não encontrado!');
                this.router.navigate([this.config.loginRouter]);
            }
        } else {
            // Redireciona para login se não autenticado
            this.router.navigate([this.config.loginRouter]);
        }
        return false; // Bloqueia o acesso por padrão
    }
}
