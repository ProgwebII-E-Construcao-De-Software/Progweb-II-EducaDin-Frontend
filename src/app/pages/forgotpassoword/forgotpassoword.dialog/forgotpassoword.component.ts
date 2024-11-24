import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-forgotpassoword',
    templateUrl: './forgotpassoword.component.html',
    styleUrl: './forgotpassoword.component.scss'
})
export class ForgotpassowordComponent implements OnInit {
    formGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ForgotpassowordComponent>
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
    }

    close()
        :
        void {
        this.dialogRef.close();
    }

}
