import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanhoListComponent } from './ganho-list/ganho-list.component';
import { GanhoFormComponent } from './ganho-form/ganho-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    GanhoFormComponent,
    GanhoListComponent,
    GanhoListComponent
  ]
})
export class GanhosModule { }
