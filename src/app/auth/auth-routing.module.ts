import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {noAuthGuard} from '@/guard/no-auth.guard';
import {authGuard} from '@/guard/auth.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./signin/signin.component').then(c => c.SigninComponent),
    canActivate: [noAuthGuard],
    title: 'Sign In'
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent),
    canActivate: [noAuthGuard],
    title: 'Sign Up'
  },
  {
    path: 'set-new-password',
    loadComponent: () => import('./set-new-password/set-new-password.component').then(c => c.SetNewPasswordComponent),
    canActivate: [authGuard],
    title: 'Set New Password'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
