import { NoteFormComponent } from './notes/note-form/note-form.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { AttachmentsComponent } from './attachments/attachments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadComponent: () => SignInComponent },
  { path: 'main', loadComponent: () => MainComponent },
  { path: 'profile', loadComponent: () => ProfileComponent },
  { path: 'notes', loadComponent: () => NoteFormComponent },
  { path: 'attachments', loadComponent: () => AttachmentsComponent },
  { path: '**', redirectTo: 'sign-in' },
];
