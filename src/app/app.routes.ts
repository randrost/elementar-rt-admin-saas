import { Routes } from '@angular/router';
// import { authGuard } from './guard/auth.guard';
// import {noAuthGuard} from '@/guard/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '',
    loadComponent: () => import('./common/common.component').then(c => c.CommonComponent),
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./main/main.component').then(c => c.MainComponent),
        title: 'Home'
      },
      // {
      //   path: 'overview',
      //   loadComponent: () => import('./overview/overview.component').then(c => c.OverviewComponent),
      //   title: 'Overview'
      // },
      // {
      //   path: 'users',
      //   loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
      //   title: 'Users'
      // }
    ]
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./error/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
