import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  timerRunning: boolean = false;
  showTimer: boolean = false;
  minutes: string | number = '00';
  seconds: string | number = '00';

  resendOtpUrl = environment.resendOtpUrl;

  constructor(private http: HttpClient) { }

  resendOtp(payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', this.resendOtpUrl);
    return this.http.post<any[]>(this.resendOtpUrl, payload);
  }

  startTimer(duration: number) {
    this.timerRunning = true;
    this.showTimer = true;
    let timer = duration;
    let interval = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = Math.floor(timer % 60);

      this.minutes = minutes < 10 ? '0' + minutes : String(minutes);
      this.seconds = seconds < 10 ? '0' + seconds : String(seconds);

      if (--timer < 0) {
        clearInterval(interval);
        this.timerRunning = false;
        this.showTimer = false;
      }
    }, 1000);
  }
}
