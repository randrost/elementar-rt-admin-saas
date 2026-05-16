import {Component, inject, OnInit} from '@angular/core';
import { DashboardComponent, WidgetItem, WidgetConfig } from '@elementar-rt/components/dashboard';
import {HeaderService} from '@service/header.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [
    DashboardComponent
  ],
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private _headerService = inject(HeaderService);

  configs: WidgetConfig[] = [
    {
      type: 'analytics-total-users-widget',
      skeleton: null,
      component: () =>
        import('@/app/widgets/analytics-total-users-widget/analytics-total-users-widget.component')
          .then(c => c.AnalyticsTotalUsersWidgetComponent)
    },
    {
      type: 'analytics-likes-widget',
      skeleton: null,
      component: () =>
        import('@/app/widgets/analytics-likes-widget/analytics-likes-widget.component')
          .then(c => c.AnalyticsLikesWidgetComponent)
    },
    {
      type: 'analytics-gross-revenue-widget',
      skeleton: null,
      component: () =>
        import('@/app/widgets/analytics-gross-revenue-widget/analytics-gross-revenue-widget.component')
          .then(c => c.AnalyticsGrossRevenueWidgetComponent)
    },
  ];
  widgets: WidgetItem[] = [
    {
      id: 12,
      type: 'analytics-gross-revenue-widget',
      columns: 4,
    },
    {
      id: 10,
      type: 'analytics-likes-widget',
      columns: 4,
    },
    {
      id: 1,
      type: 'analytics-total-users-widget',
      columns: 3,
    },
  ];

  ngOnInit(): void {
    this._headerService.title.set('Main');
  }
}
