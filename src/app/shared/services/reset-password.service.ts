import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  resetPassword(password: string): Observable<any[]> {
    console.log(password);
    return this.http.post<any[]>(this.resetPasswordUrl, password)
  }

}
