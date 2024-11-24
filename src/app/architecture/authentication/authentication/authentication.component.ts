import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ForgotpassowordComponent} from "../../../core/forgotpassoword/forgotpassoword.dialog/forgotpassoword.component";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {

    formGroup!: FormGroup;
    hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        const container = document.getElementById('container');
        const toggleForm = document.getElementById('toggleForm');
        const cadastroForm = document.getElementById('cadastroForm');
        const loginForm = document.getElementById('loginForm');

        toggleForm?.addEventListener('click', () => {
            container?.classList.toggle('show-login');
            if (container?.classList.contains('show-login')) {
                cadastroForm?.setAttribute('style', 'display: none;');
                loginForm?.setAttribute('style', 'display: block;');
                toggleForm!.textContent = 'Cadastrar';
            } else {
                loginForm?.setAttribute('style', 'display: none;');
                cadastroForm?.setAttribute('style', 'display: block;');
                toggleForm!.textContent = 'Entrar';
            }
        });
    }

    onSubmit() {

    }

    openDialogPassoword() {
        const dialogRef = this.dialog.open(ForgotpassowordComponent,
            {
                data:
                    {
                        num: 1
                    }
            })
        dialogRef.afterClosed().subscribe(() => {
            }
        )

    }

}
