import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  contentTransform: string = 'translateX(0)'; // Inicialmente mostra o painel de login
  email: string = ''; // Armazena o email compartilhado entre os formulários

  // Alterna para o painel de login
  switchToLogin(): void {
    this.contentTransform = 'translateX(0)';
  }

  // Alterna para o painel de cadastro
  switchToRegister(): void {
    this.contentTransform = 'translateX(-50%)';
  }

  // Simula o login
  onLogin(): void {
    console.log(`Usuário logado com o email: ${this.email}`);
  }

  // Simula o registro e preenche o email no login
  onRegister(): void {
    console.log(`Usuário cadastrado com o email: ${this.email}`);
    this.switchToLogin(); // Após o cadastro, alterna para o painel de login
  }
}
