import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IncomeListDto} from "../../../api/models/income-list-dto";
import {IncomeControllerService} from "../../../api/services/income-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IncomesDialogComponent} from "../incomes-dialog/incomes-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {IncomeDto} from "../../../api/models/income-dto";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";
import {MessageService} from "../../../arquitetura/message/message.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import _default from "chart.js/dist/core/core.interaction";
import {MatSort} from "@angular/material/sort";
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-earnings-table',
  templateUrl: './incomes-table.component.html',
  styleUrls: ['./incomes-table.component.scss']
})

export class IncomesTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'description', 'incomeDate', 'amount', 'acao'];
  incomeTableDataSource: MatTableDataSource<IncomeListDto> = new MatTableDataSource<IncomeListDto>([]);
  tipoDeListagem: string = 'Normal';
  qtdRegistros!: number;
  pageSlice!: IncomeDto[];
  innerWidth: number = window.innerWidth;
  flexDivAlinhar: string = 'row';
  userId!: number;
  // selection = new SelectionModel<IncomeListDto>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected router: ActivatedRoute,
    protected messageService: MessageService,
    public incomeService: IncomeControllerService,
    private securityService: SecurityService
  ) {

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.userId = this.securityService.getUserId(); // Obter o ID do usuário autenticado
    if (!this.userId) {
      console.error("Erro: userId não encontrado no SecurityService");
      return;
    }
    this.listIncomes();
  }


  public listIncomes(): void {
    this.incomeService.incomeControllerListAllPageByUser({
      id: this.userId,
      page: {page: 0, size: 5, sort: ["id"]}
    }).subscribe(data => {
      this.incomeTableDataSource.data = data.content || [];
      this.pageSlice = this.incomeTableDataSource.data;
      this.qtdRegistros = data.totalElements || 0;
    });
  }


  private formatDate(date?: string): string {
    if (!date) return 'Data indisponível';
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  }

  removeIncomes(incomes: IncomeListDto): void {
    if (incomes.id !== undefined) {
      console.log(`Excluindo item: ${incomes.description}`);
      this.incomeService.incomeControllerRemove({id: incomes.id})
        .subscribe({
          next: () => {
            this.incomeTableDataSource.data = this.incomeTableDataSource.data.filter(item => item.id !== incomes.id);
            this.messageService.addMsgSuccess(`Ganho "${incomes.name}" excluído com sucesso!`);
            console.log("Exclusão realizada com sucesso");
          },
          error: (error) => {
            if (error.status === 404) {
              this.messageService.addMsgInf(`O ganho "${incomes.name}" já foi removido.`);
            } else {
              this.messageService.addMsgDanger("Erro ao excluir o ganho. Tente novamente.");
              console.error("Erro ao excluir:", error);
            }
          }
        });
    } else {
      console.error("Erro: o ID do item é indefinido.");
      this.messageService.addMsgDanger("Erro ao excluir: o ID do item é indefinido.");
    }
  }


  confirmDeletionIncomes(incomes: IncomeListDto): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar Exclusão?',
        mensagem: `Deseja realmente excluir o ganho "${incomes.name}" da categoria "${incomes.category?.name}"?`,
        textoBotoes: {
          ok: 'Excluir',
          cancel: 'Cancelar',
        },
        dado: incomes
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.removeIncomes(confirmed.dado);
      }
    });
  }


  openDialogEditIncomes(incomes: IncomeDto) {
    console.log('Abrindo diálogo de edição para o ganho:', incomes);
    const dialogRef = this.dialog.open(IncomesDialogComponent, {
      data: {id: incomes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo fechado, resultado:', result);
      this.listIncomes();
      if (result) {
        this.messageService.addMsgSuccess("Ganhos editados com sucesso!");
      }
    });
  }

  openDialogAddIncomes() {
    const dialogRef = this.dialog.open(IncomesDialogComponent, {
      data: {id: null}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listIncomes();
      if (result) {
        this.messageService.addMsgSuccess("Ganhos adicionas com sucesso !")
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.incomeService.incomeControllerListAllPage({
      page: {
        page: event.pageIndex,
        size: event.pageSize,
        sort: ["id"]
      }
    }).subscribe(data => {
      this.incomeTableDataSource.data = data.content || [];
      this.pageSlice = this.incomeTableDataSource.data;
    })
  }

  showResult($event: any[]) {
    this.incomeTableDataSource.data = $event;
  }

  mudarAlinhar() {

    if (this.innerWidth < 1500) {
      return this.flexDivAlinhar = "column";
    }
    return this.flexDivAlinhar = "row";

  }

}
