import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-regsiter-add',
  templateUrl: './register-add.component.html',
  styleUrl: './register-add.component.scss'
})
export class RegisterAddComponent implements OnInit {
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    formGroup!: FormGroup;
    hide = true;
    passwordStrength = 0;
    passwordStrengthColor = 'warn'

    ngOnInit() {
    }

    onSubmit() {

    }

    onPasswordInput(password: string) {
        const strength = this.calculatePasswordStrength(password);
        this.passwordStrength = strength.value;
        this.passwordStrengthColor = strength.color;
    }

    private calculatePasswordStrength(password: string) {
        let score = 0;

        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        if (score <= 1) {
            return { value: 25, color: 'warn' };
        } else if (score === 2) {
            return { value: 50, color: 'accent' };
        } else if (score === 3) {
            return { value: 75, color: 'primary' };
        } else {
            return { value: 100, color: 'primary' };
        }
    }


    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };

}
