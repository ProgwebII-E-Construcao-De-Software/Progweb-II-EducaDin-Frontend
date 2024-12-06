import { Component, Injectable, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { GoalDto } from '../../../api/models/goal-dto';
import { GoalControllerService } from '../../../api/services/goal-controller.service';

import { GoalsDialogComponent } from '../goals-dialog/goals-dialog.component';
import {MessageService} from "../../../arquitetura/message/message.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-goals-table',
  templateUrl: './goals-table.component.html',
  styleUrls: ['./goals-table.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class GoalsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'amountTotal',
    'goalDate',
    'actions',
  ];
  goalTableDataSource: MatTableDataSource<GoalDto> = new MatTableDataSource<GoalDto>([]);
  selection = new SelectionModel<GoalDto>(true, []);
  tipoDeListagem: string = 'Normal';

  constructor(
    private goalService: GoalControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listGoals();
  }

  /** Lista todas as metas da API */
  public listGoals() {
    this.goalService.goalControllerListAll().subscribe(
      (data) => {
        this.goalTableDataSource.data = data;
        console.log('Metas carregadas:', data);
      },
      (error) => {
        console.error('Erro ao carregar metas:', error);
        this.messageService.addMsgDanger('Erro ao carregar metas.');
      }
    );
  }

  /** Seleciona todas as metas na tabela */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.goalTableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Marca/desmarca todas as metas */
  selectAll(event: any) {
    if (event.checked) {
      this.selection.select(...this.goalTableDataSource.data);
    } else {
      this.selection.clear();
    }
  }

  /** Alterna a seleção de uma meta individual */
  onCheckboxChange(goal: GoalDto) {
    this.selection.toggle(goal);
  }

  /** Remove uma meta */
  removeGoal(goal: GoalDto): void {
    if (goal.id !== undefined) {
      this.goalService.goalControllerRemove({ id: goal.id }).subscribe(
        (response) => {
          this.listGoals();
          this.messageService.addMsgSuccess(
            `Meta: ${goal.name} excluída com sucesso!`
          );
        },
        (error) => {
          console.error('Erro ao excluir meta:', error);
          if (error.status === 404) {
            this.messageService.addMsgInf('Meta não encontrada.');
          } else {
            this.messageService.addMsgDanger('Erro ao excluir meta.');
          }
        }
      );
    } else {
      console.error('Erro: ID da meta é indefinido.');
    }
  }

  /** Confirma exclusão de uma meta */
  confirmDeletionGoal(goal: GoalDto): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar Exclusão?',
        mensagem: `Deseja excluir a meta: ${goal.name}?`,
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
        this.snackBar.open('Meta excluída com sucesso!', 'Fechar', {
          duration: 4000,
        });
      }
    });
  }

  /** Abre o diálogo de edição para a meta */
  openDialogEditGoal(goal: GoalDto) {
    const dialogRef = this.dialog.open(GoalsDialogComponent, {
      data: { goal, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo fechado, resultado:', result);
      if (result) {
        this.listGoals();
        this.snackBar.open('Meta editada com sucesso!', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}
