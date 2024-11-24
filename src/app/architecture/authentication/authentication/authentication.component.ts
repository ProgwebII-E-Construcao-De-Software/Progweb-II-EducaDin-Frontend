import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

    formGroup!: FormGroup;
    hide = true;

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

    onSubmit(){

    }

    openDialog(){

    }
}
