import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard-stacked-bar',
    templateUrl: './dashboard-stacked-bar.component.html',
    styleUrls: ['./dashboard-stacked-bar.component.scss']
})
export class DashboardStackedBarComponent implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const incomesColor = documentStyle.getPropertyValue('--green-500') || '#84cb9f';
        const espensesColor = documentStyle.getPropertyValue('--red-500')|| '#fd7b7b';

        this.data = {
            labels: [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            datasets: [
                {
                    type: 'bar',
                    label: 'Ganhos',
                    backgroundColor: incomesColor,
                    data: [50, 25, 12, 48, 90, 76, 42, 33, 45, 60, 78, 88]
                },
                {
                    type: 'bar',
                    label: 'Gastos',
                    backgroundColor: espensesColor,
                    data: [21, 84, 24, 75, 37, 65, 34, 50, 40, 72, 55, 44]
                },
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

}
