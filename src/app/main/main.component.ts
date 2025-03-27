import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { API } from '../API/api';
import { take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  logout() {
    this.authService.signOut();
  }

  getBusinessUnits() {
    this.http
      .get(`${API}/BusinessUnits`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('Subscription error:', error);
        },
      });
  }

  getDocumentTypes() {
    this.http
      .get(`${API}/DocumentTypes`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('Subscription error:', error);
        },
      });
  }

  documentTypesMode = new FormControl(0);
  getDocumentTypesMode() {
    const url = `${API}/DocumentTypes/${this.documentTypesMode.value}/mode`;

    this.http
      .get(url)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('Subscription error:', error);
        },
      });
  }

  getStates() {
    this.http
      .get(`${API}/States`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('Subscription error:', error);
        },
      });
  }

  getDocClassStates() {
    const docTypeId = 1;

    this.http
      .get(`${API}/States/${docTypeId}`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log('Subscription error:', error);
        },
      });
  }
}
