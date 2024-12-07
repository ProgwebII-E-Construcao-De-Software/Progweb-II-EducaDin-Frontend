import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GoalDto} from "../../../api/models/goal-dto";
import {GoalControllerService} from "../../../api/services/goal-controller.service";
import {DateAdapter} from "@angular/material/core";
import {MessageService} from "../../../arquitetura/message/message.service";
import {ConfirmDialogComponent} from "../../../arquitetura/message/confirm-mesage/confirm-dialog.component";
import {ConfirmationDialogResult} from "../../../arquitetura/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-goals-dialog',
    templateUrl: './goals-dialog.component.html',
    styleUrls: ['./goals-dialog.component.scss']
})
export class GoalsDialogComponent implements OnInit {
    formGroup!: FormGroup;

    public readonly ACAO_INCLUIR = "Adicionar Metas";
    public readonly ACAO_EDITAR = "Editar Metas";
    acao: string = this.ACAO_INCLUIR;
    id!: number;

    constructor(
        private dialogRef: MatDialogRef<GoalsDialogComponent>,
        private formBuilder: FormBuilder,
        private goalService: GoalControllerService,
        private _adapter: DateAdapter<any>,
        protected messageService: MessageService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.id = data.id || null;
        this._adapter.setLocale('pt-br');
    }

    ngOnInit() {
        this.creatForm();
        if (this.id) {
            this.acao = this.ACAO_EDITAR;
            this.loadGoalData(this.id);
        }
    }

    private creatForm() {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
            goalDate: [new Date(), Validators.required],
            amountTotal: [null, [Validators.required, Validators.min(0)]],
            amountReached: [null, [Validators.required, Validators.min(0)]],
        });
    }

    private loadGoalData(id: number) {
        this.goalService.goalControllerGetById({ id }).subscribe({
            next: (goal: GoalDto) => {
                this.formGroup.patchValue({
                    ...goal,
                    goalDate: goal.goalDate ? new Date(goal.goalDate) : new Date(),
                });
            },
            error: (error) => {
                this.messageService.addMsgWarning(`Erro ao buscar ganho: ${error.message}`);
            }
        });
    }

    public closeDialog(reload: boolean = false): void {
        this.dialogRef.close(reload);
    }

    public onSubmit() {
        if (this.formGroup.valid) {
            this.id ? this.updateGoal() : this.createGoals();
        }
    }

    private createGoals() {
        const goalDto: GoalDto = {
            ...this.formGroup.value,
            userId: this.getUserIdFromSession(),
        };

        this.goalService.goalControllerCreate({ body: goalDto }).subscribe({
            next: (response) => {
                this.showConfirmation(response, this.ACAO_INCLUIR);
                this.messageService.addMsgSuccess('Metas adicionado com sucesso!', 'Fechar');
                this.closeDialog(true);
            },
            error: (error) => {
                this.messageService.addMsgWarning(`Erro ao adicionar ganho: ${error.message}`);
            }
        });
    }

    private updateGoal() {
        const updatedGoal: GoalDto = {
            id: this.id,
            ...this.formGroup.value,
            userId: this.getUserIdFromSession(),
            goalDate: new Date(this.formGroup.value.goalDate).toISOString()
        };
        console.log('atualização:', updatedGoal);
        this.goalService.goalControllerUpdate({ id: this.id, body: updatedGoal }).subscribe({
            next: (response: GoalDto) => {
                if (response && response.name) {
                    this.showConfirmation(response, this.ACAO_EDITAR);
                    this.messageService.addMsgSuccess('Metas atualizado com sucesso!', 'Fechar');
                    this.closeDialog(true);
                } else {
                    console.warn('Objeto de resposta vazio ou inválido:', response);
                    this.messageService.addMsgWarning('O ganho foi atualizado, mas o servidor não retornou os dados corretamente.');
                    const fallbackResponse: GoalDto = {
                        id: this.id,
                        ...this.formGroup.value
                    };
                    this.showConfirmation(fallbackResponse, this.ACAO_EDITAR);
                    this.closeDialog(true);
                }
            },
            error: (error) => {
                this.messageService.addMsgWarning(`Erro ao atualizar metas: ${error.message}`);
            }
        });
    }

    private showConfirmation(goal: GoalDto, action: string) {
        if (!goal || !goal.name) {
            console.error('Objeto de Metas inválido:', goal);
            this.messageService.addMsgWarning('Erro ao processar a confirmação. Dados do Metas ausentes.');
            return;
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                titulo: action === this.ACAO_INCLUIR ? 'Adicionado' : 'Editado',
                mensagem: `${goal.name} foi ${action === this.ACAO_INCLUIR ? 'adicionado' : 'atualizado'} com sucesso!`,
                textoBotoes: { ok: 'Confirmar' },
            },
        });

        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
            if (confirmed?.resultado) {
                this.closeDialog(true);
            }
        });
    }

    private getUserIdFromSession(): number {
        return 1;
    }

    public handleError(controlName: string, errorName: string) {
        return this.formGroup.controls[controlName].hasError(errorName);
    }

    close() {
        this.dialogRef.close();
    }
}
