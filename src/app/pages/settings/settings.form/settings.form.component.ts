import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-settings.form',
  templateUrl: './settings.form.component.html',
  styleUrl: './settings.form.component.scss'
})
export class SettingsFormComponent {
    formGroup!: FormGroup;
    namePerson!: string;
    email!: string;

    constructor(
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
    ) {
        this._adapter.setLocale('pt-br');
    }

    fieldVisibleEmail(){

    }

    controlNotfication(event: any){

    }


}
