import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneLoginTokenResponse, PhoneModelResponse, UserModelResponse } from 'src/app/model/library.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  keyCloakURL = environment.keycloakUrl
  addUserURL = environment.addUserURL
  verifyOtpUrlEmail = environment.verifyOtpUrlEmail
  verifyOtpUrlPhone = environment.verifyOtpUrlPhone
  addUserByPhoneUrl = environment.addUserByPhoneUrl
  // verifyOtpUrlPhoneLogin = environment.verifyOtpUrlPhoneLogin
  // verifyOtpUrl = environment.verifyOtpUrl
  resendOtpUrl = environment.resendOtpUrl

  constructor(
    private http: HttpClient
  ) { }

  getAccessToken(payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', this.keyCloakURL);
    return this.http.post<any[]>(this.keyCloakURL, payload);
  }

  addUser(payload: any = {}): Observable<UserModelResponse> {
    console.log(payload, '/n', this.addUserURL);
    console.log(environment.token)
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);
    return this.http.post<UserModelResponse>(this.addUserURL, payload);
  }

  verifyOtp(payload: any = {}): Observable<any[]> {
    if (payload.receiverEmail) {
      console.log(payload, '/n', this.verifyOtpUrlEmail);
      console.log(environment.token)
      return this.http.post<any[]>(this.verifyOtpUrlEmail, payload);
    } else {
      console.log(payload, '/n', this.verifyOtpUrlPhone);
      console.log(environment.token)
      return this.http.post<any[]>(this.verifyOtpUrlPhone, payload);
    }
  }

  resendOtp(payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', this.resendOtpUrl);
    return this.http.post<any[]>(this.resendOtpUrl, payload);
  }

  resendOtpForPhone(payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', this.resendOtpUrl);
    return this.http.post<any[]>(this.resendOtpUrl, payload);
  }

  addUserByPhone(payload: any = {}): Observable<PhoneModelResponse> {
    console.log(payload, '/n', this.addUserURL);
    console.log(environment.token);
    return this.http.post<PhoneModelResponse>(this.addUserURL, payload);
  }

  // verifyPhoneOTPLogin(payload: any = {}): Observable<PhoneLoginTokenResponse> {
  //   console.log(payload, '/n', this.addUserURL);
  //   // console.log(environment.token);
  //   return this.http.post<PhoneLoginTokenResponse>(this.verifyOtpUrlPhoneLogin, payload);
  // }

}
