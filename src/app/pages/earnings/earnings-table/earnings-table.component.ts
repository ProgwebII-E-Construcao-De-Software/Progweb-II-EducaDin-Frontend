import { Component } from '@angular/core';

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
    displayedColumns: string[] = ['categoria', 'descricao', 'data', 'valor'];
    earnings: Earnings[] = [
        { categoria: 'Salário', descricao: 'Salário mensal', data: '01-09-2024', valor: 5000 },
        { categoria: 'Investimento', descricao: 'Compra de casa', data: '02-09-2024', valor: 1200 }
    ];
}
