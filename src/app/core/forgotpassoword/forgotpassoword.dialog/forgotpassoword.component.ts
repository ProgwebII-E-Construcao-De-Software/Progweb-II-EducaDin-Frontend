import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {AuthApiService} from "../../../api/services/auth-api.service";
import {MessageService} from "../../../arquitetura/message/message.service";

@Component({
    selector: 'app-forgotpassoword',
    templateUrl: './forgotpassoword.component.html',
    styleUrl: './forgotpassoword.component.scss'
})
export class ForgotpassowordComponent implements OnInit {
    formGroup!: FormGroup;
    innerWidth: number = window.innerWidth;
    flexDivAlinhar: string = 'row';

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ForgotpassowordComponent>,
        private authService: AuthApiService,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        protected messageService: MessageService,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.innerWidth = window.innerWidth;
    }

    private createForm() {
        this.formGroup = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
        });
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            const {email} = this.formGroup.value;
            this.recoverPassoword(email);
        } else {
            console.error('Preencha todos os campos corretamente.');
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.innerWidth = window.innerWidth;
    }

    mudarAlinhar() {
        if (innerWidth < 1000) {
            return this.flexDivAlinhar = "column";
        }
        return this.flexDivAlinhar = "row";
    }

    public recoverPassoword(email: string): void {
        this.authService.recoverPassword({ email }).subscribe({
            next: () => {
                this.messageService.addMsgSuccess('Solicitação de recuperação enviada para o e-mail informado.', 'Fechar');
                this.dialogRef.close();
            },
            error: (err) => {
                console.error('Erro ao solicitar recuperação de senha:', err);
                this.messageService.addMsgDanger('Não foi possível enviar a solicitação. Tente novamente mais tarde.', 'Fechar');
            },
        });
    }


    close()
        :
        void {
        this.dialogRef.close();
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
