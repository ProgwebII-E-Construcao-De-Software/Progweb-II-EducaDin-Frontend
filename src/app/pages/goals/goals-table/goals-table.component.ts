import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

import {GoalDto} from '../../../api/models/goal-dto';
import {GoalControllerService} from '../../../api/services/goal-controller.service';

import {GoalsDialogComponent} from '../goals-dialog/goals-dialog.component';
import {MessageService} from "../../../arquitetura/message/message.service";
import {
    ConfirmationDialog,
    ConfirmationDialogResult
} from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GoalListDto} from "../../../api/models/goal-list-dto";

@Component({
    selector: 'app-goals-table',
    templateUrl: './goals-table.component.html',
    styleUrls: ['./goals-table.component.scss'],
})
@Injectable({
    providedIn: 'root',
})
export class GoalsTableComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'goalDate','amountReached','amountTotal', 'acao'];
    goalTableDataSource: MatTableDataSource<GoalListDto> = new MatTableDataSource<GoalListDto>([]);
    innerWidth: number = window.innerWidth;
    flexDivAlinhar: string = 'row';
    pageSlice!: GoalDto[];
    tipoDeListagem: string = 'Normal';
    qtdRegistros!: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar,
        protected router: ActivatedRoute,
        protected messageService: MessageService,
        public goalService: GoalControllerService,
    ) {
    }

    ngOnInit(): void {
        this.listGoals();
    }

    public listGoals() {
        this.goalService.goalControllerListAllPage({page: {page: 0, size: 5, sort:["pessoaCpf"]}}).subscribe(data => {
            this.goalTableDataSource.data = data.content  || [];
            this.pageSlice = this.goalTableDataSource.data;
            this.qtdRegistros = data.totalElements || 0;
        })
    }

    private formatDate(date?: string): string {
        if (!date) return 'Data indisponível';
        const parsedDate = new Date(date);
        return parsedDate.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }

    /** Remove uma meta */
    removeGoal(goal: GoalDto): void {
        if (goal.id !== undefined) {
            console.log(`Excluindo item: ${goal.name}`);
            this.goalService.goalControllerRemove({id: goal.id}).subscribe({
                next: () => {
                    this.goalTableDataSource.data = this.goalTableDataSource.data.filter(item => item.id !== goal.id);
                    this.messageService.addMsgSuccess(`Metas "${goal.name}" excluído com sucesso!`);
                    console.log("Exclusão realizada com sucesso");
                },
                error: (error) => {
                    if (error.status === 404) {
                        this.messageService.addMsgInf(`A meta "${goal.name}" já foi removido.`);
                    } else {
                        this.messageService.addMsgDanger("Erro ao excluir o ganho. Tente novamente.");
                        console.error("Erro ao excluir:", error);
                    }
                }
            });
        } else {
            console.error('Erro: ID da meta é indefinido.');
            this.messageService.addMsgDanger("Erro ao excluir: o ID do item é indefinido.");
        }
    }

    /** Confirma exclusão de uma meta */
    confirmDeletionGoal(goal: GoalDto): void {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                titulo: 'Confirmar Exclusão?',
                mensagem: `Deseja realmente excluir a meta "${goal.name}" ID: "${goal.id}"?`,
                textoBotoes: {
                    ok: 'Confirmar',
                    cancel: 'Cancelar',
                },
                dado: goal,
            },
        });

        dialogRef.afterClosed().subscribe((result: ConfirmationDialogResult) => {
            if (result?.resultado) {
                this.removeGoal(result.dado);
            }
        });
    }

    openDialogEditGoal(goal: GoalDto) {
        const dialogRef = this.dialog.open(GoalsDialogComponent, {
            data: {id: goal},
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Diálogo fechado, resultado:', result);
            this.listGoals();
            if (result) {
                this.messageService.addMsgSuccess("Metas editados com sucesso!");
            }
        });
    }

    openDialogAddIncomes() {
        const dialogRef = this.dialog.open(GoalsDialogComponent, {
            data: {id: null}
        });
        dialogRef.afterClosed().subscribe(result =>{
            this.listGoals();
            if(result){
                this.messageService.addMsgSuccess("Ganhos adicionas com sucesso !")
            }
        });
    }

    onPageChange(event: PageEvent) {
        this.goalService.goalControllerListAllPage({
            page: {
                page: event.pageIndex,
                size: event.pageSize,
                sort: ["id"]
            }
        }).subscribe(data => {
            this.goalTableDataSource.data = data.content || [];
            this.pageSlice = this.goalTableDataSource.data;
        })
    }

    showResult($event: any[]) {
        this.goalTableDataSource.data = $event;
    }

    mudarAlinhar() {

        if (this.innerWidth < 1500) {
            return this.flexDivAlinhar = "column";
        }
        return this.flexDivAlinhar = "row";

    }
}
