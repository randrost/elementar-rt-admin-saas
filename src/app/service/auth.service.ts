import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map, tap} from 'rxjs';
import {IJwtResponse} from '@interface/IJwtResponse';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);

  isAuthenticated: WritableSignal<boolean> = signal(false);

  constructor() {
    this._checkAuthOnInit();
    this._clearAuthOnExpire();
  }

  signIn(username: string, password: string): Observable<IJwtResponse> {
    return this._http.post<IJwtResponse>('/auth/signin', {username, password}).pipe(
      tap(response => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('expiresAt', response.expiresAt.toString());
        this.isAuthenticated.set(true);
        const expiresIn = new Date(response.expiresAt).getTime() - Date.now();
        setTimeout(() => this._clearAuthState(), expiresIn);
      })
    );
  }

  signUp(username: string, password: string, email: string): Observable<void> {
    return this._http.post<void>('/auth/signup', {username, password, email});
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    return this._http.post<void>('/auth/change-password', {oldPassword, newPassword});
  }

  logout(): void {
    this._clearAuthState();
  }

  private _clearAuthOnExpire(): void {
    const expiresAt = localStorage.getItem('expiresAt');
    if (!expiresAt) return;
    const timeout = expiresAt ? new Date(expiresAt).getTime() - Date.now() : 0;
    setTimeout(() => this._clearAuthState(), timeout);
  }

  private _checkAuthOnInit(): void {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    if (token && expiresAt && new Date(expiresAt).getTime() > Date.now()) {
      this.isAuthenticated.set(true);
    } else {
      this._clearAuthState();
    }
  }

  private _clearAuthState(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    this.isAuthenticated.set(false);
    this._router.navigate(['/auth/sign-in']);
  }
}
