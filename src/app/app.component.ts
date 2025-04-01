import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/service/auth.service';
import { HeaderComponent } from '@components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  // styleUrl: './.component.scss',
})
export class AppComponent implements OnInit {
  title = 'prova-web-api-arxivar';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isAuthenticated = () => this.authService.isAuthenticated();

  ngOnInit() {
    this.authService.isAuthenticated();
  }
}
