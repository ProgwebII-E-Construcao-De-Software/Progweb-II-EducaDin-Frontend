import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-expenses-dialog',
  templateUrl: './expenses-dialog.component.html',
  styleUrl: './expenses-dialog.component.scss'
})
export class ExpensesDialogComponent {
    categoria!: String;
    categorias: string[] = ['Casa', 'Saude', 'Supermercado'];
    descricao!: String;
    date!: String;
    value!: String;
    repete!: String;

    constructor(
        public dialogRef: MatDialogRef<ExpensesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { name: string }
    ) {
    }


    closeDialog(): void {
        this.dialogRef.close();
    }
}
