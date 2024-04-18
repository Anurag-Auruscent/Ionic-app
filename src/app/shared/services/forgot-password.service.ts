import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModelResponse, verifyOtpResponse } from 'src/app/model/library.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  keyCloakURL = environment.keycloakUrl
  addUserURL = environment.addUserURL
  forgotPasswordOtpUrl = environment.forgotPasswordUrl
  sendEmailOtpUrl = environment.sendEmailOtpUrl

  constructor(
    private http: HttpClient
  ) { }

  getAccessToken(payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', this.keyCloakURL);
    return this.http.post<any[]>(this.keyCloakURL, payload);
  }

  verifyOtp(payload: any = {}): Observable<verifyOtpResponse> {
    console.log(payload, '/n', this.forgotPasswordOtpUrl);
    return this.http.post<verifyOtpResponse>(this.forgotPasswordOtpUrl, payload);
  }

  sendEmail(payload: any = {}): Observable<any[]> {
    console.log(payload);
    return this.http.post<any[]>(this.sendEmailOtpUrl, payload);
  }
}
