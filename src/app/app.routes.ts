import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadComponent: () => SignInComponent },
  { path: 'main', loadComponent: () => MainComponent },
  { path: 'profile', loadComponent: () => ProfileComponent },
  { path: '**', redirectTo: 'sign-in' },
];
