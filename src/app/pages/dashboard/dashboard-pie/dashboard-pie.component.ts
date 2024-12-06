import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard-pie',
    templateUrl: './dashboard-pie.component.html',
    styleUrl: './dashboard-pie.component.scss'
})
export class DashboardPieComponent implements OnInit{
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#000000';
        const colorIncomes500 = documentStyle.getPropertyValue('--green-500') || '#84cb9f';
        const colorExpenses500 = documentStyle.getPropertyValue('--red-500') || '#fd7b7b';
        const colorGoals = documentStyle.getPropertyValue('--yellow-500') || '#f6e39b';
        const colorIncomes400 = documentStyle.getPropertyValue('--green-400') || '#84cb9f';
        const colorExpenses400 = documentStyle.getPropertyValue('--red-400') || '#fd7b7b';
        const colorGoals400 = documentStyle.getPropertyValue('--yellow-400') || '#f5e29a';

        this.data = {
            labels: ['Ganhos', 'Gastos', 'Metas'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [colorIncomes500, colorExpenses500, colorGoals],
                    hoverBackgroundColor: [colorIncomes400, colorExpenses400, colorGoals400]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

}
