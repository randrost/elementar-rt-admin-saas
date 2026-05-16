import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  navItems: WritableSignal<any[]> = signal([
    {
      key: 'home',
      type: 'link',
      name: 'Home',
      icon: 'ph:house-duotone',
      link: '/'
    },
    {
      key: 'users',
      type: 'link',
      name: 'Users',
      icon: 'ph:users-duotone',
      link: '/users'
    },
    {
      key: 'overview',
      type: 'link',
      name: 'Overview',
      icon: 'ph:chart-bar-duotone',
      link: '/overview'
    }
  ]);

  footerNavItems: WritableSignal<any[]> = signal([
    {
      key: 'help',
      type: 'link',
      name: 'Help Center',
      icon: 'ph:question-duotone',
      link: '/help'
    },
    {
      key: 'docs',
      type: 'link',
      name: 'Documentation',
      icon: 'ph:lifebuoy-duotone',
      link: '/docs'
    },
  ]);
}
