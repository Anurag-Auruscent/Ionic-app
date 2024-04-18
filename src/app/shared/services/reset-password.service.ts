import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resetPasswordRequest } from 'src/app/model/library.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  keyCloakURL = environment.keycloakUrl
  forgotPasswordOtpUrl = environment.forgotPasswordUrl
  resetPasswordUrl = environment.resetPasswordUrl

  constructor(
    private http: HttpClient
  ) { }

  getAccessToken(payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', this.keyCloakURL);
    return this.http.post<any[]>(this.keyCloakURL, payload);
  }

  resetPassword(payload: resetPasswordRequest): Observable<any[]> {
    console.log(payload);
    return this.http.post<any[]>(this.resetPasswordUrl, payload)
  }
}
