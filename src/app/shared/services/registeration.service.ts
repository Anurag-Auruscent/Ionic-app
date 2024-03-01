import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModelResponse } from 'src/app/model/library.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  keyCloakURL = environment.keycloakUrl
  addUserURL = environment.addUserURL
  verifyOtpUrl = environment.verifyOtpUrl

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
    console.log(payload, '/n', this.verifyOtpUrl);
    console.log(environment.token)
    return this.http.post<any[]>(this.verifyOtpUrl, payload);
  }

}
