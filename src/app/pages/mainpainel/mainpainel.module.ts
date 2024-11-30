import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MainpainelSystemComponent} from "./mainpainel-system/mainpainel-system.component";
import {MainpainelHomeComponent} from "./mainpainel-home/mainpainel-home.component";
import {mainpainelRoutes} from "./mainpainel-routing.module";


@NgModule({
    declarations: [
        MainpainelHomeComponent,
        MainpainelSystemComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterOutlet,
        RouterLink,
        MatGridListModule,
        MatSlideToggleModule,
        FormsModule,
        RouterModule.forChild(mainpainelRoutes),
    ]
})
export class MainpainelModule {
}
