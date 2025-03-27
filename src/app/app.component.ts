import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  title = 'prova-web-api-arxivar';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    const cookies = this.authService.getToken();

    if (cookies) {
      console.log(
        `
        * User is authenticated with cookies: *

        ${cookies.tokenType}

        `,
        cookies
      );
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
