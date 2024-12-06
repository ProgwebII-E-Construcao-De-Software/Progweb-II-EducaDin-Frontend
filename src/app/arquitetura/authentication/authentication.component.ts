import {Component} from '@angular/core';
import {CredencialDto} from "../../api/models/credencial-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ForgotpassowordComponent} from "../../core/forgotpassoword/forgotpassoword.dialog/forgotpassoword.component";
import {SecurityService} from "../security/security.service";
import {User} from "../security/User";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
    formGroup!: FormGroup;
    hide = true;

    constructor(
        private securityService: SecurityService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,) {
        this.createForm();
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            password: [null, Validators.required],
        });
    }

    public onSubmit(): void {
        if (this.formGroup.valid) {
            this.authenticationService.login(this.formGroup.value).subscribe({
                next: (data: CredencialDto) => {
                    const user: User = {
                        id: data.id || 0,
                        nome: data.name || '',
                        login: data.login || '',
                        expiresIn: data.expiresIn || 3600,
                        accessToken: data.accessToken || '',
                        refreshToken: data.refreshToken || '',
                        roles: data.roles
                    };

                    this.securityService.init(user);
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    console.error('Erro de login:', error);
                    if (error.status === 401) {
                        // Usuário ou senha incorretos
                        alert('Usuário ou senha incorretos. Verifique suas credenciais.');
                    } else if (error.status === 404) {
                        // Usuário não encontrado
                        alert('Usuário não encontrado. Verifique suas credenciais ou registre-se.');
                    } else {
                        // Outros erros
                        alert('Erro ao tentar fazer login.');
                    }
                }
            });
        }
    }


    openDialogPassoword() {
        const dialogRef = this.dialog.open(ForgotpassowordComponent,
            {
                data:
                    {
                        num: 1
                    }
            })
        dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    alert('Instruções de recuperação de senha enviadas para seu e-mail.');
                }
            }
        )

    }

    public getErrorMessage(controlName: string): string {
        const control = this.formGroup.controls[controlName];
        if (control.hasError('required')) {
            return 'Este campo é obrigatório';
        }
        if (control.hasError('minlength')) {
            return `O valor deve ter no mínimo ${control.getError('minlength').requiredLength} caracteres`;
        }
        if (control.hasError('maxlength')) {
            return `O valor deve ter no máximo ${control.getError('maxlength').requiredLength} caracteres`;
        }
        return '';
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };
}
