import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedMaterialModule} from "../../shared-material/shared-material.module";
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {RouterLink, RouterOutlet } from '@angular/router';
import {DocumentationComponent} from "./documentation.component";



@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    RouterOutlet,
    RouterLink,
    SharedMaterialModule,
  ]
})
export class DocumentationModule { }
