import {EventEmitter, Injectable, signal, TemplateRef, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  templateRefs: WritableSignal<TemplateRef<any>[]> = signal([]);
  openPanel: EventEmitter<string> = new EventEmitter<string>();
  closePanel: EventEmitter<string> = new EventEmitter<string>();
}
