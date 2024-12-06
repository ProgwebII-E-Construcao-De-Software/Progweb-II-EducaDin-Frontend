import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsHomeComponent} from "./settings.home/settings.home.component";
import {SettingsFormComponent} from "./settings.form/settings.form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {settingsRoutes} from "./settings-routing.module";
import { MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
    declarations: [
        SettingsHomeComponent,
        SettingsFormComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(settingsRoutes),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterOutlet,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatSlideToggleModule,
    ]
})
export class SettingsModule {
}
