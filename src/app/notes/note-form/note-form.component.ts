import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { NoteService } from '../note.service';
import { NoteDTO } from '../models';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-note-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
})
export class NoteFormComponent {
  private readonly service = inject(NoteService);
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;
  profiles: any[] = [];

  result = '';

  ngOnInit() {
    this.form = this.fb.group({
      docnumber: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  constructor() {}

  onSubmit() {
    const note: NoteDTO = this.form.value;
    console.log('🚀 ~ onSubmit ~ note:', note);

    if (this.form.valid) {
      this.service.createNote(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.result = JSON.stringify(res);
        },
        error: (error) => console.log('Subscription error:', error),
      });
    }
  }
}
