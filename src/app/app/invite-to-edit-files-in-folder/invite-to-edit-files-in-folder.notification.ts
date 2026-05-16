import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DicebearComponent } from '@elementar-rt/components/avatar';
import {
  Notification,
  NotificationActorComponent,
  NotificationAvatarDirective,
  NotificationComponent,
  NotificationContentComponent,
  NotificationMessageComponent,
  NotificationTimeComponent
} from '@elementar-rt/components/notifications';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'emr-invite-to-edit-files-in-folder',
  imports: [
    MatIcon,
    DicebearComponent,
    NotificationAvatarDirective,
    NotificationActorComponent,
    NotificationMessageComponent,
    NotificationTimeComponent,
    NotificationContentComponent,
    NotificationComponent,
    MatRipple,
  ],
  templateUrl: './invite-to-edit-files-in-folder.notification.html',
  styleUrl: './invite-to-edit-files-in-folder.notification.scss'
})
export class InviteToEditFilesInFolderNotification {
  notification = input.required<Notification>();
}
