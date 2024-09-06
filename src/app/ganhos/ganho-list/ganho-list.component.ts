import { Component, OnInit } from '@angular/core';
import { GanhoService } from '../ganho.service';
import { Ganho } from '../ganho.model';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ganho-list',
  templateUrl: './ganho-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  styleUrls: ['./ganho-list.component.scss']
})
export class GanhoListComponent implements OnInit {
  ganhos: Ganho[] = [];

  constructor(private ganhoService: GanhoService, private router: Router) {}

  ngOnInit(): void {
    // Carrega a lista de ganhos do serviço
    this.ganhoService.getGanhos().subscribe((ganhos: Ganho[]) => {
      this.ganhos = ganhos;
    });
  }

  // Função para editar um ganho
  onEdit(id: number | undefined): void {
    if (id !== undefined) {
      // Direciona para a rota de edição com o id do ganho
      this.router.navigate(['/ganhos/editar', id]);
    }
  }

  // Função para deletar um ganho
  onDelete(id: number | undefined): void {
    if (id !== undefined) {
      // Deleta o ganho pelo id
      this.ganhoService.deleteGanho(id);
      // Atualiza a lista de ganhos após a deleção
      this.ganhos = this.ganhos.filter(ganho => ganho.id !== id);
    }
  }

  // Função para adicionar um novo ganho
  onAdd(): void {
    // Direciona para a rota de criação de um novo ganho
    this.router.navigate(['/ganhos/novo']);
  }

  // Adiciona um ganho manualmente
  onAddManual(): void {
    const novoGanho: Ganho = {
      categoria: 'Investimento',
      descricao: 'Lucro de ações',
      data: new Date(),  // Define a data atual
      valor: 2000
    };

    // Chama o serviço para adicionar o novo ganho
    this.ganhoService.addGanho(novoGanho);

    // Atualiza a lista local de ganhos
    this.ganhoService.getGanhos().subscribe((ganhos: Ganho[]) => {
      this.ganhos = ganhos;
    });
  }
}
