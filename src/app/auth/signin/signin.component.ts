import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {LogoComponent} from '@elementar-rt/components/logo';
import {NgOptimizedImage} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.development';
import {AuthService} from '@service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  imports: [
    RouterLink,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    LogoComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _authService: AuthService = inject(AuthService);

  form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });
  throttleTimer: any;

  protected readonly environment = environment;


  signIn(): void {
    if (this.throttleTimer) return;

    this.throttleTimer = setTimeout(() => {
      this.throttleTimer = null; // Reset throttle timer
    }, 300);

    const {username, password} = this.form.value;
    if (!username || !password) return;

    this._authService.signIn(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this._snackBar.open('Sign in failed. Please check your credentials.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
