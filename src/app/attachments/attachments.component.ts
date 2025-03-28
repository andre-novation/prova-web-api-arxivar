import { Component, inject } from '@angular/core';
import { InsertComponent } from '../../components/bufferAPI/insert/insert.component';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AttachmentsService } from './attachments.service';

@Component({
  selector: 'app-attachments',
  imports: [
    ReactiveFormsModule,
    InsertComponent,
    IftaLabelModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss',
})
export class AttachmentsComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly service = inject(AttachmentsService);

  form: FormGroup = this.fb.group({
    bufferid: [[''], Validators.required],
    comment: ['', Validators.required],
    docnumber: [0, Validators.required],
  });

  buffer = (data: string[]) => this.form.patchValue({ bufferid: data });

  onSubmit() {
    this.service.create(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log('Subscription error:', error),
    });
  }
}
