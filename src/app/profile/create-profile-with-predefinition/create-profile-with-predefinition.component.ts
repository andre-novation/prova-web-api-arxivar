import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import {
  FieldBaseDTO,
  PredefinedProfileDTO,
} from '../service/PredefinedProfileDTO';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';

import { FluidModule } from 'primeng/fluid';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-profile-with-predefinition',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    FluidModule,
    ButtonModule,
    InputNumberModule,
    DividerModule,
    InputTextModule,
    DatePickerModule,
    IftaLabelModule,
  ],
  templateUrl: './create-profile-with-predefinition.component.html',
  styleUrl: './create-profile-with-predefinition.component.scss',
})
export class CreateProfileWithPredefinitionComponent {
  private readonly service = inject(ProfileService);
  private readonly fb = inject(FormBuilder);

  predefinitionsOptions = signal<PredefinedProfileDTO[]>([]);

  form: FormGroup = this.fb.group({});
  predefinitionControl = new FormControl({} as PredefinedProfileDTO);

  predefinitionFields = signal<FieldBaseDTO[]>([]);

  ngOnInit() {
    this.getPredefinitions();
  }

  getPredefinitions() {
    return this.service.getPredefinitions().subscribe({
      next: (res) =>
        this.predefinitionsOptions.set(res as PredefinedProfileDTO[]),
      error: (error) => console.log('Subscription error:', error),
    });
  }

  getPredefinitionFields() {
    if (!this.predefinitionControl.value!.id) return;

    return this.service
      .getPredefinitionFields(this.predefinitionControl.value!.id)
      .subscribe({
        next: (res) => this.generateForm(res as PredefinedProfileDTO),
        error: (error) => console.log('Subscription error:', error),
      });
  }

  generateForm(predefinition: PredefinedProfileDTO) {
    const form: { [key: string]: FormControl } = {};

    if (!predefinition.fields) return;

    this.predefinitionFields.set(predefinition.fields);

    this.predefinitionFields().forEach((field: FieldBaseDTO) => {
      if (field.value && this.getInputType(field.className) === 'date') {
        field.value = new Date(field.value);
      }

      console.log(field.name, field.required);

      const validator = field.required ? [Validators.required] : [];
      form[field.name!] = new FormControl(field.value || '', validator);
    });

    this.form = this.fb.group(form);
  }

  onSubmit() {
    console.log(this.form.value);

    this.service
      .createProfile(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log(res),
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
      ProtocolDateFieldDTO: 'date',
    };

    return typeMap[className] || 'text';
  }
}
