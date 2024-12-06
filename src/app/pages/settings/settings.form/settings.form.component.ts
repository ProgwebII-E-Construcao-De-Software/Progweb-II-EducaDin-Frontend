import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserControllerService } from '../../../api/services/user-controller.service';

@Component({
    selector: 'app-settings-form',
    templateUrl: './settings.form.component.html',
    styleUrls: ['./settings.form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
    formGroup!: FormGroup;
    hideSenhaAntiga = true;
    hideNovaSenha = true;
    user: { name: string; email: string } = { name: 'John Doe', email: 'example@example.com' };

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserControllerService
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.loadUserData();
    }

    createForm(): void {
        this.formGroup = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            alterarSenha: [false],
            senhaAntiga: [null, Validators.required],
            senha: [null, [Validators.minLength(6)]],
        });
    }

    loadUserData(): void {
        // Simulating user data
        this.formGroup.patchValue({
            email: this.user.email,
        });
    }

    onSubmit(): void {
        const { email, alterarSenha, senha, senhaAntiga } = this.formGroup.value;
        const updateData: any = { email };

        if (alterarSenha) {
            updateData.senhaAntiga = senhaAntiga;
            updateData.senha = senha;
        }

        this.userService.update(updateData).subscribe(
            () => {
                alert('Informações atualizadas com sucesso!');
            },
            (error) => {
                console.error('Error updating user data:', error);
                alert('Ocorreu um erro ao atualizar as informações.');
            }
        );
    }
}
