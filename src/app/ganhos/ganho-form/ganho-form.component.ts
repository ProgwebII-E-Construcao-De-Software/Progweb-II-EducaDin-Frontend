import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-ganho-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ganho-form.component.html',
  styleUrl: './ganho-form.component.scss'
})
export class GanhoFormComponent implements OnInit{
  editMode = false;
  ganhoForm!: FormGroup;

  constructor(private  fb: FormBuilder) {
  }

  ngOnInit() {
    this.ganhoForm = this.fb.group({
      categoria:['', Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      valor:[0,[Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.ganhoForm.valid) {
      // Aqui você pode processar os dados do formulário
      console.log('Form Submitted', this.ganhoForm.value);
      // Adicione a lógica para salvar os dados, por exemplo, enviando-os para um servidor
    } else {
      // Caso o formulário não seja válido, você pode querer mostrar mensagens de erro ou alertas
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.ganhoForm.reset();
  }
}
