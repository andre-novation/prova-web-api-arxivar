import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/Lara';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor'; // Ensure this path is correct and points to the interceptor file

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
