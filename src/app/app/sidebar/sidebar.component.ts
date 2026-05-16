import {Component, inject, OnInit, viewChild, WritableSignal} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import {
  SidebarBodyComponent,
  SidebarComponent as EmrSidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent, SidebarNavDividerComponent,
  SidebarNavItemComponent,
  SidebarNavItemIconDirective
} from '@elementar-rt/components/sidebar';
import { MatIconButton } from '@angular/material/button';
import { IconComponent } from '@elementar-rt/components/icon';
import { LayoutApiService } from '@elementar-rt/components/layout';
import { LogoComponent } from '@elementar-rt/components/logo';
import {environment} from '../../../environments/environment.development';
import {NavigationService} from '@service/navigation.service';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    SidebarBodyComponent,
    EmrSidebarComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,
    SidebarNavComponent,
    SidebarNavItemIconDirective,
    MatIconButton,
    IconComponent,
    SidebarNavItemComponent,
    SidebarNavDividerComponent,
    LogoComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host: {
    'class': 'sidebar'
  }
})
export class SidebarComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  private _layoutApi = inject(LayoutApiService);
  private _navigationService = inject(NavigationService);

  navItems: WritableSignal<any[]> = this._navigationService.navItems;
  navItemLinks: any[] = [];
  footerNavItems: WritableSignal<any[]> = this._navigationService.footerNavItems;
  activeKey: any = 'home';

  constructor() {
    toObservable(this.navItems).subscribe((items) => {
      items.forEach(navItem => {
        this.navItemLinks.push(navItem);

        if (navItem.children) {
          this.navItemLinks = this.navItemLinks.concat(navItem.children as any[]);
        }
      });
    });
  }

  ngOnInit() {
    this._activateLink();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this._activateLink();
      })
    ;
  }

  toggleSidebar(): void {
    this._layoutApi.toggleSidebar('root');
  }

  private _activateLink() {
    const activeLink = this.navItemLinks.find(
      navItem =>
        navItem.link === this.location.path() ||
        navItem.link === '/' && this.location.path() === ''
    );

    if (activeLink) {
      this.activeKey = activeLink.key;
    } else {
      this.activeKey = null;
    }
  }

  protected readonly environment = environment;
}
