import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalControllerService } from "../../../api/services/goal-controller.service";
import { GoalDto } from "../../../api/models/goal-dto";

@Component({
  selector: 'app-goals-dialog',
  templateUrl: './goals-dialog.component.html',
  styleUrls: ['./goals-dialog.component.css']
})
export class GoalsDialogComponent {
  goalForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<GoalsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goal?: GoalDto; isEdit: boolean },
    private fb: FormBuilder,
    private goalService: GoalControllerService
  ) {
    this.goalForm = this.fb.group({
      name: [data.goal?.name || '', [Validators.required, Validators.minLength(3)]],
      amountTotal: [data.goal?.amountTotal !== undefined ? data.goal.amountTotal : 0, [Validators.required, Validators.min(1)]],
      goalDate: [data.goal?.goalDate || '', Validators.required]
    });
  }

  save() {
    const formData = this.goalForm.value;

    if (this.data.isEdit && this.data.goal) {
      const updatedGoal = { ...this.data.goal, ...formData };
      this.goalService.goalControllerUpdate({ id: this.data.goal.id, body: updatedGoal }).subscribe(
        (updated) => this.dialogRef.close(updated),
        (error) => console.error('Erro ao atualizar meta:', error)
      );
    } else {
      this.goalService.goalControllerCreate({ body: formData }).subscribe(
        (created) => this.dialogRef.close(created),
        (error) => console.error('Erro ao criar meta:', error)
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
