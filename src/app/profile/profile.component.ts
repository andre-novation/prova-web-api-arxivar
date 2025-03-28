import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileService } from './service/profile.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { take } from 'rxjs';
import { ProfileDTO } from './service/ProfileDTO';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-profile',
  imports: [
    DividerModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    IftaLabelModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly service = inject(ProfileService);
  private readonly fb = inject(FormBuilder);

  profileForm!: FormGroup;

  profileData = signal({} as ProfileDTO);
  fileBuffer = signal({});

  resultJson = '';

  profileDocType = new FormControl('GENERIC.CLASSTEST');
  getProfile() {
    this.service
      .getProfileByDocType(this.profileDocType.value!)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.resultJson = JSON.stringify(res);
          this.profileData.set(res);
          this.createForm();
        },
        error: (error) => console.log('Subscription error:', error),
      });
  }

  createForm() {
    const form: { [key: string]: FormControl } = {};

    if (!this.profileData()) return;

    this.profileData().fields!.forEach((field) => {
      if (field.required) {
        console.log('🚀 ~ createForm ~ field:', field);

        form[field.name!] = new FormControl(field.value! || '');
      }
    });

    this.profileForm = this.fb.group(form);
    console.log('🚀 ~ createForm ~ this.profileData():', this.profileData());
  }

  inserfBuffer(event: FileSelectEvent) {
    console.log('🚀 ~ inserfBuffer ~ event:', event);
    console.log('🚀 ~ inserfBuffer ~ event:', event);

    this.service
      .postBufferInsert(event.currentFiles[0])
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          console.log(res);

          const buffer: string[] = res;

          if (buffer.length === 0) return;

          this.profileData.update((data) => {
            if (data.document) {
              data.document.bufferIds = buffer;
            }

            return data;
          });
        },
        error: (error) => console.log('Subscription error:', error),
      });
  }

  onSubmit() {
    console.log(this.profileForm.value);

    this.profileData.update((data) => {
      data.fields!.forEach((field) => {
        field.value = this.profileForm.value[field.name!];
      });

      return data;
    });

    console.log('🚀 ~ onSubmit ~ this.profileData():', this.profileData());

    this.service
      .createProfile(this.profileData())
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.resultJson = JSON.stringify(res);
        },
        error: (error) => console.log('Subscription error:', error),
      });
  }

  //
  //
  //

  getInputType(className: string): string {
    const typeMap: { [key: string]: string } = {
      BusinessUnitFieldDTO: 'text',
      DocumentTypeFieldDTO: 'text',
      StateFieldDTO: 'text',
      OriginFieldDTO: 'number',
      DocumentDateFieldDTO: 'date',
      NumberFieldDTO: 'number',
      SubjectFieldDTO: 'text',
      FromFieldDTO: 'text',
      ToFieldDTO: 'text',
      AdditionalFieldStringDTO: 'text',
      AdditionalFieldIntDTO: 'number',
      AdditionalFieldDateTimeDTO: 'date',
      AdditionalFieldComboDTO: 'text',
      ImportantFieldDTO: 'checkbox',
    };

    return typeMap[className] || 'text';
  }

  //
  //
  //
}
