import { Component } from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";

interface Expenses {
    categoria: string;
    descricao: string;
    data: string;
    valor: number;
}

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss'
})

export class ExpensesTableComponent {
    displayedColumns: string[] = ['select','categoria', 'descricao', 'data', 'valor', 'acao'];
    expenses: Expenses[] = [
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
        { categoria:  'Despesas', descricao: 'Aluguel', data: '01-09-2024', valor: 1000 },
        { categoria: 'Despesas', descricao: 'Compra para casa', data: '02-09-2024', valor:500 },
    ];

    selection = new SelectionModel<Expenses>(true, []);


    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.expenses.length;
        return numSelected === numRows;
    }


    selectAll(event: any) {
        if (event.checked) {
            this.selection.select(...this.expenses);
        } else {
            this.selection.clear();
        }
    }


    onCheckboxChange(element: Expenses) {
        this.selection.toggle(element);
    }


    tipoDeListagem: string = 'Normal';


    editar(element: Expenses): void {
        console.log(`Editar item: ${element.descricao}`);

    }

    excluir(element: Expenses): void {
        console.log(`Excluir item: ${element.descricao}`);

    }
}
