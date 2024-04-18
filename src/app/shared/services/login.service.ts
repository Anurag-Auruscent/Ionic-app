import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneLoginTokenResponse, PhoneModelResponse, UserModelResponse } from 'src/app/model/library.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  keyCloakURL = environment.keycloakUrl
  addUserURL = environment.addUserURL
  verifyOtpUrlEmail = environment.verifyOtpUrlEmail
  verifyOtpUrlPhone = environment.verifyOtpUrlPhone
  addUserByPhoneUrl = environment.addUserByPhoneUrl
  generateLoginOtpUrl = environment.generateLoginOtpUrl
  verifyOtpPhoneLogin = environment.verifyOtpUrlForPhoneLogins

  constructor(
    private http: HttpClient
  ) { }

  generateLoginOtp(payload: any = {}): Observable<any[]> {
    console.log(payload);
    return this.http.post<any[]>(this.generateLoginOtpUrl, payload);
  }

  verifyPhoneOtpLogin(payload: any = {}): Observable<any[]> {
    console.log(payload);
    // console.log(this.verifyOtpUrlPhoneLogin);
    return this.http.post<any[]>(this.verifyOtpPhoneLogin, payload);
  }

}
