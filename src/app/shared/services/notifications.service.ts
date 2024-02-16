import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseUrl = 'http://localhost:9000/library/request';

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<any[]> {
    // Assuming you have an endpoint to fetch all notifications
    return this.http.get<any[]>(`${this.baseUrl}/notifications`);
  }

  approveNotification(requestId: string): Observable<any> {
    const approveUrl = `${this.baseUrl}/approve?requestId=${requestId}`;
    return this.http.post(approveUrl, {});
  }

  rejectNotification(requestId: string): Observable<any> {
    const rejectUrl = `${this.baseUrl}/reject?requestId=${requestId}`;
    return this.http.post(rejectUrl, {});
  }
}
