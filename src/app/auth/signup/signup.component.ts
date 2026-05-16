import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HorizontalDividerComponent } from '@elementar-rt/components/divider';
import { LogoComponent } from '@elementar-rt/components/logo';
import { NgOptimizedImage } from '@angular/common';
import {environment} from '../../../environments/environment.development';
import {
  PassToggleVisibilityComponent,
  PasswordStrengthComponent,
  PasswordStrengthInfoComponent
} from '@elementar-rt/components/password-strength';
import {AuthService} from '@service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    RouterLink,
    ReactiveFormsModule,
    LogoComponent,
    NgOptimizedImage,
    PasswordStrengthComponent,
    PasswordStrengthInfoComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private _router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  form = this._formBuilder.group({
    name: this._formBuilder.control('', [Validators.required]),
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required, Validators.minLength(8)]),
  });

  protected readonly environment = environment;

  signUp(): void {
    if (this.form.invalid) return;
    const { name, email, password } = this.form.value;
    if (!name || !email || !password) return;

    this._authService.signUp(name, password, email).subscribe({
      next: () => {
        this._snackBar.open('Sign up successful! Please sign in.', 'Close', {
          duration: 3000
        });
        this._router.navigate(['/auth/sign-in']);
      },
      error: (error) => {
        console.log('Sign up error:', error);
        this._snackBar.open('Sign up failed. Please check your details.', 'Close', {
          duration: 3000
        });
      }
    })
  }
}
