import {Component, Inject, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {IncomeControllerService} from "../../../api/services/income-controller.service";

@Component({
    selector: 'app-earnings-dialog',
    templateUrl: './earnings-dialog.component.html',
    styleUrl: './earnings-dialog.component.scss'
})
export class EarningsDialogComponent {
    categoria!: String;
    categorias: string[] = ['Salário', 'Freelance', 'Investimentos'];
    categoryControl = new FormControl();
    formGroup!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EarningsDialogComponent>,
        private formBuilder: FormBuilder,
        private adapter: DateAdapter<any>,
        public earningService: IncomeControllerService,
        @Inject(MAT_DIALOG_DATA) public data: { name: string }
    ) {
        this.creatForm();
        this.adapter.setLocale('pt-br');
    }

    public creatForm() {
        this.formGroup = this.formBuilder.group({
                name: [null, Validators.required],
                categoryName: [null, Validators.required],
                description: [null, Validators.required],
                incomeDate: [new Date(), Validators.required],
                amount: [null, [Validators.required, Validators.min(0)]],
                repeat: [null, Validators.required],
                leadTime: [0, Validators.min(0)],
            }
        )
    }


    public closeDialog(): void {
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.formGroup.valid) {

            console.log("Dados:", this.formGroup.value);
            this.earningService.create({body: this.formGroup.value}).subscribe(
                retorn => {
                    console.log("Retorno", retorn);
                    alert("Inclusão com Sucesso ! Mensagem Server" +retorn)
                }, erro => {
                    console.log("Erro", +erro);
                    alert("Erro ao Incluir !");
                }
            )
        }
    }

    onCategoryChange(): void {

    }

    addCategory(): void {

    }

    editCategory(): void {

    }

    removeCategory(): void {

    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    };
}
