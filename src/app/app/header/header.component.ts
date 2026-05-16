import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { NotificationsPopoverComponent } from '../notifications-popover/notifications-popover.component';
import { RouterLink } from '@angular/router';
import { DicebearComponent } from '@elementar-rt/components/avatar';
import { PopoverTriggerForDirective } from '@elementar-rt/components/popover';
import { SoundEffectDirective } from '@elementar-rt/components/core';
import {
  BreadcrumbItemComponent,
  BreadcrumbItemIconDirective,
  BreadcrumbsComponent,
  BreadcrumbSeparatorComponent
} from '@elementar-rt/components/breadcrumbs';
import { IconComponent } from '@elementar-rt/components/icon';
import { LayoutApiService } from '@elementar-rt/components/layout';
import {
  ColorSchemeDarkDirective,
  ColorSchemeLightDirective,
  ColorSchemeSwitcherComponent
} from '@elementar-rt/components/color-scheme';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatBadge,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    DicebearComponent,
    MatDivider,
    MatTooltip,
    PopoverTriggerForDirective,
    MatAnchor,
    SoundEffectDirective,
    NotificationsPopoverComponent,
    BreadcrumbItemIconDirective,
    BreadcrumbItemComponent,
    BreadcrumbSeparatorComponent,
    BreadcrumbsComponent,
    IconComponent,
    RouterLink,
    ColorSchemeDarkDirective,
    ColorSchemeLightDirective,
    ColorSchemeSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    'class': 'block w-full h-full'
  }
})
export class HeaderComponent implements OnInit {
  protected _layoutApi = inject<any>(LayoutApiService);

  get currentUser(): any {
    return {
      displayName: 'John Doe',
      email: 'email@example.com',
      photoURL: ''
    };
  }

  ngOnInit() {
  }

  toggleSidebar(): void {
    this._layoutApi.toggleSidebar('root');
  }
}
