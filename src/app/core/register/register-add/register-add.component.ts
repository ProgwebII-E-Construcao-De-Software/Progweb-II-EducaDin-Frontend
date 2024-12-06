import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {DateAdapter} from "@angular/material/core";
import {UserCreateDto} from "../../../api/models/user-create-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "../../../arquitetura/message/message.service";

@Component({
    selector: 'app-regsiter-add',
    templateUrl: './register-add.component.html',
    styleUrl: './register-add.component.scss'
})
export class RegisterAddComponent {
    formGroup!: FormGroup;
    hide = true;
    hideConfirm = true;
    passwordStrength = 0;
    passwordStrengthColor = 'warn';
    flexDivAlinhar: string = 'row';
    submitFormulario!: boolean;
    codigo!: number;
    user!: UserCreateDto[];
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private userService: UserControllerService,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        protected messageService: MessageService,
    ) {
        this._adapter.setLocale('pt-br');
        this.createForm()
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
                login: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
                email: [null, [Validators.required, Validators.email]],
                password: [null, [Validators.required]],
                confirmPassword: [null, [Validators.required]],
            },
            {
                validators: this.validatePasswordMatch

            });
    }

    validatePasswordMatch(group: FormGroup) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        if (!password || !confirmPassword) {
            return null; 
        }

        return password === confirmPassword ? null : { passwordsMismatch: true };
    }


    onSubmit() {
        if (this.formGroup.valid) {
            this.registerUser();
        }

    }


    registerUser() {
        const user: UserCreateDto = {
            login: this.formGroup.value.login,
            email: this.formGroup.value.email,
            password: this.formGroup.value.password,
        }
        if (this.formGroup.valid) {
            this.userService.create({body: user}).subscribe(
                response => {
                    console.log("Retorno Registro", response);
                    this.messageService.addMsgSuccess(`Usuário "${user.login}" adicionado com sucesso!`);
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    console.error("Erro:", error.error);
                }
            );
        }
    }


    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
