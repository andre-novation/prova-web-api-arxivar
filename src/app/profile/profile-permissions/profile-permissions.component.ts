import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile-permissions',
  imports: [CommonModule, CardModule],
  templateUrl: './profile-permissions.component.html',
  styleUrl: './profile-permissions.component.scss',
})
export class ProfilePermissionsComponent {}
