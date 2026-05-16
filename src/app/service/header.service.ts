import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  breadcrumbsPath: WritableSignal<{
    label: string;
    icon?: string;
    link?: string;
    onClick: (event: MouseEvent) => void;
  }[]> = signal([]);

  title: WritableSignal<string> = signal('');
}
