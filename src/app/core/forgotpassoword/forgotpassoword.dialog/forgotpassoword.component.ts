import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

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
