import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../shared/services/notifications.service';

@Component({
  selector: 'app-viewallnotifications',
  templateUrl: './viewallnotifications.page.html',
  styleUrls: ['./viewallnotifications.page.scss'],
})
export class ViewAllNotificationsPage implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    // Fetch notifications using a service method (design and functionality done by another developer)
    this.refreshNotifications()
  }

  approveNotification(notificationId: string) {
    // Call the approve API
    this.notificationsService.approveNotification(notificationId)
      .subscribe({
        next: (response) => {
          console.log('Notification approved successfully', response);
          // Optionally, update the UI or fetch updated data
        },
        error: (error) => {
          console.error('Error approving notification:', error);
          // Handle error (e.g., show an error toast)
        }
      });
  }


  rejectNotification(notificationId: string) {
    // Call the reject API
    this.notificationsService.rejectNotification(notificationId)
      .subscribe({
        next: (response) => {
          console.log('Notification rejected successfully', response);
          // Optionally, update the UI or fetch updated data
        },
        error: (error) => {
          console.error('Error rejecting notification:', error);
          // Handle error (e.g., show an error toast)
        }
      });
  }


  private refreshNotifications() {
    // Optionally, fetch and update the list of notifications after an action (approve/reject)
    this.notificationsService.getAllNotifications()
      .subscribe(
        (data: any[]) => {
          this.notifications = data;
        },
        (error) => {
          console.error('Error refreshing notifications:', error);
        }
      );
  }
}
