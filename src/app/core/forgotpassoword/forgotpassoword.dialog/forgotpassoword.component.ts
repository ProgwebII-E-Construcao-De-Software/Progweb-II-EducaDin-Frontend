import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {Login} from "../../../api/models/login";
import {UserCreateDto} from "../../../api/models/user-create-dto";

@Component({
    selector: 'app-forgotpassoword',
    templateUrl: './forgotpassoword.component.html',
    styleUrl: './forgotpassoword.component.scss'
})
export class ForgotpassowordComponent implements OnInit {
    formGroup!: FormGroup;
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ForgotpassowordComponent>,
        private userController: UserControllerService,
        private dialog: MatDialog,
        private router: Router,
        private snackBar: MatSnackBar,
        private securityService: SecurityService,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
    }

    ngOnInit() {
        this.createForm();
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

    public recoverPassoword(email: string){

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
