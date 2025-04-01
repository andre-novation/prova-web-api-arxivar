import { NoteFormComponent } from './notes/note-form/note-form.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/create-profile/profile.component';
import { AttachmentsComponent } from './profile/attachments/attachments.component';
import { CreateProfileWithPredefinitionComponent } from './profile/create-profile-with-predefinition/create-profile-with-predefinition.component';
import { ProfilePermissionsComponent } from './profile/profile-permissions/profile-permissions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadComponent: () => SignInComponent },
  { path: 'main', loadComponent: () => MainComponent },
  { path: 'profile', loadComponent: () => ProfileComponent },
  {
    path: 'profilePredefined',
    loadComponent: () => CreateProfileWithPredefinitionComponent,
  },
  {
    path: 'profilePermissions',
    loadComponent: () => ProfilePermissionsComponent,
  },
  { path: 'notes', loadComponent: () => NoteFormComponent },
  { path: 'attachments', loadComponent: () => AttachmentsComponent },
  { path: '**', redirectTo: 'sign-in' },
];
