import { Component } from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";

//TODO Apos a implementação do Back-End será apagado
interface Earnings {
    categoria: string;
    descricao: string;
    data: string;
    valor: number;
}

@Component({
    selector: 'app-earnings-table',
    templateUrl: './earnings-table.component.html',
    styleUrls: ['./earnings-table.component.scss']
})
export class EarningsTableComponent {
    displayedColumns: string[] = ['select','categoria', 'descricao', 'data', 'valor', 'acao'];
    earnings: Earnings[] = [
        { categoria:  'Salário', descricao: 'Salário mensal', data: '01-09-2024', valor: 5000 },
        { categoria: 'Investimento', descricao: 'Compra de casa', data: '02-09-2024', valor: 1200 },
        { categoria:  'Salário', descricao: 'Salário mensal', data: '01-09-2024', valor: 5000 },
    ];

    selection = new SelectionModel<Earnings>(true, []);


    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.earnings.length;
        return numSelected === numRows;
    }


    selectAll(event: any) {
        if (event.checked) {
            this.selection.select(...this.earnings);
        } else {
            this.selection.clear();
        }
    }


    onCheckboxChange(element: Earnings) {
        this.selection.toggle(element);
    }


    tipoDeListagem: string = 'Normal';


    editar(element: Earnings): void {
        console.log(`Editar item: ${element.descricao}`);

    }

    excluir(element: Earnings): void {
        console.log(`Excluir item: ${element.descricao}`);

    }
}
