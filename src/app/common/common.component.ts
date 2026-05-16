import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/app/header/header.component';
import { SidebarComponent } from '@/app/sidebar/sidebar.component';
import {
  LayoutBodyComponent,
  LayoutComponent,
  LayoutSidebarComponent
} from '@elementar-rt/components/layout';
import { PanelBodyComponent, PanelComponent, PanelHeaderComponent } from '@elementar-rt/components/panel';
import { SidePanelComponent, SidePanelTabComponent } from '@elementar-rt/components/side-panel';
import {HeaderService} from '@service/header.service';
import {SidebarService} from '@service/sidebar.service';
import {NgTemplateOutlet} from '@angular/common';
import {MatError} from '@angular/material/form-field';

@Component({
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    LayoutBodyComponent,
    LayoutComponent,
    LayoutSidebarComponent,
    PanelBodyComponent,
    PanelComponent,
    PanelHeaderComponent,
    SidePanelComponent,
    NgTemplateOutlet,
    SidePanelTabComponent,
  ],
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss'
})
export class CommonComponent implements OnInit {
  private _headerService = inject(HeaderService);
  private _sidebarService = inject(SidebarService);
  title: WritableSignal<string> = this._headerService.title;
  sidebarTemplates: WritableSignal<TemplateRef<any>[]> = this._sidebarService.templateRefs;

  @ViewChild('sidePanel') sidePanel!: SidePanelComponent;

  ngOnInit() {
    this._sidebarService.openPanel.subscribe((tabId: string) => {
      if (this.sidePanel.activeTabId() === null) this.sidePanel.toggleTab(tabId);
    })

    this._sidebarService.closePanel.subscribe((tabId: string) => {
      if (this.sidePanel.activeTabId() === tabId) {
        this.sidePanel.toggleTab(tabId);
        this.sidePanel.activeTabId.set(null);
      }
    })
  }
}
