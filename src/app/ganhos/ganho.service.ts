import { Injectable } from '@angular/core';
import { Ganho } from './ganho.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GanhoService {
  private ganhos: Ganho[] = [
    { id: 1, categoria: 'Salário', descricao: 'Salário de Agosto', data: new Date(), valor: 5000 },
    { id: 2, categoria: 'Freelance', descricao: 'Projeto Website', data: new Date(), valor: 1500 },
  ];

  // Obtém todos os ganhos
  getGanhos(): Observable<Ganho[]> {
    return of(this.ganhos);
  }

  // Adiciona um novo ganho
  addGanho(ganho: Ganho): void {
    ganho.id = this.ganhos.length + 1;  // Gera um novo ID baseado no tamanho do array
    this.ganhos.push(ganho);
  }

  // Deleta um ganho pelo ID
  deleteGanho(id: number): void {
    this.ganhos = this.ganhos.filter(ganho => ganho.id !== id);
  }

  // Obtém um ganho específico pelo ID
  getGanhoById(id: number): Observable<Ganho | undefined> {
    return of(this.ganhos.find(ganho => ganho.id === id));
  }

  // Atualiza um ganho existente
  updateGanho(id: number, updatedGanho: Ganho): void {
    const index = this.ganhos.findIndex(ganho => ganho.id === id);
    if (index > -1) {
      this.ganhos[index] = { ...updatedGanho, id };  // Mantém o ID original ao atualizar
    }
  }
}
