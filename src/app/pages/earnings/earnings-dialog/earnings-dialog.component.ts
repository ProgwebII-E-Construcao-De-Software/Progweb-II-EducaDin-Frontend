import {Component, Inject, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-earnings-dialog',
    templateUrl: './earnings-dialog.component.html',
    styleUrl: './earnings-dialog.component.scss'
})
export class EarningsDialogComponent {
    categoria!: String;
    categorias: string[] = ['Salário', 'Freelance', 'Investimentos'];
    descricao!: String;
    date!: String;
    value!: String;
    repete!: String;

    constructor(
        public dialogRef: MatDialogRef<EarningsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { name: string }
    ) {
    }


    onNoClick(): void {
        this.dialogRef.close();
    }
}
