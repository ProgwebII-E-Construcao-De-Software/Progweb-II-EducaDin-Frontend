import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SecurityService} from "../../../architecture/security/security.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {DateAdapter} from "@angular/material/core";
import {UserCreateDto} from "../../../api/models/user-create-dto";
import {CredencialDto} from "../../../api/models/credencial-dto";

@Component({
    selector: 'app-regsiter-add',
    templateUrl: './register-add.component.html',
    styleUrl: './register-add.component.scss'
})
export class RegisterAddComponent implements OnInit {
    formGroup!: FormGroup;
    hide = true;
    passwordStrength = 0;
    passwordStrengthColor = 'warn';
    flexDivAlinhar: string = 'row';
    submitFormulario!: boolean;
    codigo!: number;
    user!: UserCreateDto[];

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private userService: UserControllerService,
        private router: Router,
    ) {
        this._adapter.setLocale('pt-br');
    }

    ngOnInit() {
        this.createForm()
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            confirmarSenha: [null, [Validators.required]],
        }, { validators: this.validatePasswordMatch });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.registerUser();
        } else if (this.codigo) {
            const controlSenha = this.formGroup.get('senha');
            if (controlSenha) {
                controlSenha.setErrors(null);
            }
            const controlConfirmSenha = this.formGroup.get('confirmarSenha');
            if (controlConfirmSenha) {
                controlConfirmSenha.setErrors(null);
            }
        }

    }

    validatePasswordMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmarSenha')?.value;

        if (password !== confirmPassword) {
            return { passwordMismatch: true };
        }
        return null;
    }


    verificarAlinhar() {
        if (this.flexDivAlinhar == "column") {
            return true;
        }
        return false;
    }

    onPasswordInput(password: string) {
        const strength = this.calculatePasswordStrength(password);
        this.passwordStrength = strength.value;
        this.passwordStrengthColor = strength.color;
    }

    getErrorClass(controlName: string): { [key: string]: any } | null {
        const control = this.formGroup.get(controlName);
        if (this.codigo == null) {
            if (this.submitFormulario && control && control.errors) {
                const qdErros = Object.keys(control.errors).length;

                return {
                    'margin-top': 17 * qdErros + 'px'
                };
            }

            if (!this.submitFormulario && control && control.errors && control.touched) {
                const qdErros = Object.keys(control.errors).length;

                return {
                    'margin-top': 17 * qdErros + 'px'
                };
            }
            this.submitFormulario = false;
            return {};
        } else {
            return {
                'margin-top': 17 * 1 + 'px'
            };
        }
    }

    registerUser() {
        if (this.formGroup.valid) {
            const { confirmarSenha, ...userData } = this.formGroup.value;
            this.userService.create(userData).subscribe(
                response => {
                    console.log("Retorno Registro", response);
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    console.error("Erro:", error.error);
                }
            );
        }
    }

    private calculatePasswordStrength(password: string) {
        let score = 0;

        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        if (score <= 1) {
            return {value: 25, color: 'warn'};
        } else if (score === 2) {
            return {value: 50, color: 'accent'};
        } else if (score === 3) {
            return {value: 75, color: 'primary'};
        } else {
            return {value: 100, color: 'primary'};
        }
    }


    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
