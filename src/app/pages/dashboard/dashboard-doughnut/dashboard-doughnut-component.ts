import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-doughnut',
  templateUrl: './dashboard-doughnut-component.html',
  styleUrl: './dashboard-doughnut-component.scss'
})
export class DashboardDoughnutComponent implements OnInit{
    data: any;
    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#000000';
        const colorExpenses = documentStyle.getPropertyValue('--blue-500') || '#fd7b7b';
        const colorIncomes = documentStyle.getPropertyValue('--yellow-500') || '#84cb9f';

        this.data = {
            labels: ['Gastos', 'Ganhos'],
            datasets: [
                {
                    data: [100, 150],
                    backgroundColor: [colorExpenses, colorIncomes],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--red-400') || '#fd7b7b',
                        documentStyle.getPropertyValue('--green-400') || '#84cb9f',
                    ]
                }
            ]
        };

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }

}
