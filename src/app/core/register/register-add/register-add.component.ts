import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SecurityService} from "../../../architecture/security/security.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {DateAdapter} from "@angular/material/core";
import {UserCreateDto} from "../../../api/models/user-create-dto";
import {CredencialDto} from "../../../api/models/credencial-dto";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../architecture/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private userService: UserControllerService,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
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
            //     confirmarSenha: [null, [Validators.required]],
            // }, { validators: this.validatePasswordMatch });
        });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.registerUser();
        }

    }


    registerUser() {
        const user: UserCreateDto = this.formGroup.value;
        if (this.formGroup.valid) {
            this.userService.create({body: user}).subscribe(
                response => {
                    console.log("Retorno Registro", response);
                    this.snackBar.open('Ganhos Adicionado', 'Close', {duration: 4000});
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    console.error("Erro:", error.error);
                }
            );
        }
    }

    // mostrarMensagem(mensagem: string, tipo: 'success' | 'error', duracao?: number): void {
    //     const dialogRef = this.dialog.open(ConfirmationDialog, {
    //         data: {
    //             titulo: tipo === 'success' ? 'Sucesso' : 'Erro',
    //             mensagem: mensagem,
    //             textoBotoes: {
    //                 ok: 'OK',
    //             },
    //         },
    //         disableClose: true
    //     });
    //
    //     if (tipo === 'success' && duracao) {
    //         dialogRef.afterOpened().subscribe(() => {
    //             setTimeout(() => {
    //                 dialogRef.close();
    //             }, duracao);
    //         });
    //     }
    //
    //     dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
    //
    //     });
    // }


    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
