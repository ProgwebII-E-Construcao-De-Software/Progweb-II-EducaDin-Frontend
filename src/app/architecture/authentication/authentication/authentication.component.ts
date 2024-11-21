import {Component} from '@angular/core';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
    ngOnInit() {
        const container = document.getElementById('container');
        const toggleForm = document.getElementById('toggleForm');
        const cadastroForm = document.getElementById('cadastroForm');
        const loginForm = document.getElementById('loginForm');

        toggleForm?.addEventListener('click', () => {
            container?.classList.toggle('show-login');
            // Alterna entre mostrar Cadastro e Login
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
}
