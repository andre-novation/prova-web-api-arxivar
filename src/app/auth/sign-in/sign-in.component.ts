import { Component, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthenticationTokenRequestDTO } from '../models';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CheckboxModule, PasswordModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(AuthService);

  key = 'a8leMPZU_fHP5LtbLBd_pTcVsyjqMsYBB55n1-8xSWBP_wFijISKkkC4EUuyfMbT';

  formGroup: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  onSubmit() {
    const user: AuthenticationTokenRequestDTO = {
      ...this.formGroup.value,
      clientId: 'clientIdAndre',
      clientSecret: this.key,
    };

    console.log(this.formGroup.value);
    this.service.signIn(user);
  }
}
