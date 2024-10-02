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
export class EarningsTableComponent implements OnInit{
    displayedColumns: string[] = ['select', 'category', 'description', 'incomeDate', 'amount', 'acao'];
    earningsTableDataSource : MatTableDataSource<IncomeListDto> = new MatTableDataSource<IncomeListDto>([]);
    selection = new SelectionModel<IncomeListDto>(true, []);
    tipoDeListagem: string = 'Normal';

    constructor(
        public earningsService: IncomeControllerService,

    ) {

    }

    ngOnInit(): void {
        this.earningsService.listAll().subscribe(data=>{
            this.earningsTableDataSource = new MatTableDataSource<IncomeListDto>(data);
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


    editar(element: IncomeListDto): void {
        console.log(`Editar item: ${element.description}`);

    }

    excluir(element: IncomeListDto): void {
        console.log(`Excluir item: ${element.description}`);

    }
}
