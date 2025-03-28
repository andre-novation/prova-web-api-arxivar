import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { API } from '../API/api';
import { take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { DividerModule } from 'primeng/divider';

import { Router } from '@angular/router';

type Select = { label: string; value: number | null }[];

@Component({
  selector: 'app-main',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    InputGroupModule,
    DividerModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  TypesModeOptions: Select = [
    { label: '-', value: null },
    { label: 'Search', value: 0 },
    { label: 'Archive', value: 1 },
    { label: 'ArchivePa', value: 2 },
  ];

  criteriaMode = new FormControl(null);
  criteriaOrderBy = new FormControl('code');
  getBusinessUnits() {
    let url = `${API}/BusinessUnits`;

    if (!!this.criteriaMode.value)
      url = `${url}?mode=${this.criteriaMode.value}&orderBy=${this.criteriaOrderBy.value}`;

    this.http
      .get(url)
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log('Subscription error:', error),
      });
  }

  getDocTypes() {
    this.http
      .get(`${API}/DocumentTypes`)
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log('Subscription error:', error),
      });
  }

  docTypesMode = new FormControl(0);
  getDocTypesMode() {
    const url = `${API}/DocumentTypes/${this.docTypesMode.value}/mode`;

    this.http
      .get(url)
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log('mode: ' + this.docTypesMode.value, res),
        error: (error) => console.log('Subscription error:', error),
      });
  }

  getStates() {
    this.http
      .get(`${API}/States`)
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log('Subscription error:', error),
      });
  }

  docTypeId = new FormControl(0);
  getDocClassStates() {
    this.http
      .get(`${API}/States/${this.docTypeId.value}`)
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log('Subscription error:', error),
      });
  }
}
