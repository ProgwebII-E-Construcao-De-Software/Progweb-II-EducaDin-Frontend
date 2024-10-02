import {Component, OnInit} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {IncomeListDto} from "../../../api/models/income-list-dto";
import {IncomeControllerService} from "../../../api/services/income-controller.service";

@Component({
    selector: 'app-earnings-table',
    templateUrl: './earnings-table.component.html',
    styleUrls: ['./earnings-table.component.scss']
})
export class EarningsTableComponent implements OnInit {
    displayedColumns: string[] = ['select', 'category', 'description', 'incomeDate', 'amount', 'acao'];
    earningsTableDataSource: MatTableDataSource<IncomeListDto> = new MatTableDataSource<IncomeListDto>([]);
    selection = new SelectionModel<IncomeListDto>(true, []);
    tipoDeListagem: string = 'Normal';

    constructor(
        public earningsService: IncomeControllerService,
    ) {

    }

    ngOnInit(): void {
        this.listEarnings();
    }

    listEarnings(){
        this.earningsService.listAll().subscribe(data => {
            this.earningsTableDataSource.data = data;
            console.log(data);
        })
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.earningsTableDataSource.data.length;
        return numSelected === numRows;
    }


    selectAll(event: any) {
        if (event.checked) {
            this.selection.select(...this.earningsTableDataSource.data);
        } else {
            this.selection.clear();
        }
    }


    onCheckboxChange(element: IncomeListDto) {
        this.selection.toggle(element);
    }


    editEarnings(element: IncomeListDto): void {
        console.log(`Editar item: ${element.description}`);

    }

    removeEarnings(element: IncomeListDto): void {
        if (element.id !== undefined) {
            console.log(`Excluir item: ${element.description}`);
            this.earningsService.remove({id: element.id})
                .subscribe(
                    retorn => {
                        this.listEarnings();
                        alert("Excluído com Sucesso!!");
                        console.log("Exclusão", retorn);
                    },
                    error => {
                        alert("Erro ao Excluir!!");
                        console.log(error);
                    }
                );
        } else {
            console.error("Erro: o ID do item é indefinido.");
            alert("Erro ao Excluir: o ID do item é indefinido.");
        }
    }
}
