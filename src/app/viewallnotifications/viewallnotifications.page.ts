import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../shared/services/notifications.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-viewallnotifications',
  templateUrl: './viewallnotifications.page.html',
  styleUrls: ['./viewallnotifications.page.scss'],
})
export class ViewAllNotificationsPage implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService, private router: Router) { }

  ngOnInit() {
    // Fetch notifications using a service method (design and functionality done by another developer)
    this.refreshNotifications()
  }

  goBack() {
    this.router.navigate(['/home']);
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
    console.log('Rejecting notification', notificationId);
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
      .subscribe({
        next: (data: any[]) => {
          console.log(data);

          this.notifications = data;
        },
        error: (error) => {
          console.error('Error refreshing notifications:', error);
        }
      });
  }
}
