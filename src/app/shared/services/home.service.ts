import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Library } from '../../model/library.model';

@Injectable()
export class HomeService {
  constructor(
    private http: HttpClient
  ) { }

  createNewLibrary(apiURL: string, payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', apiURL);
    return this.http.post<any[]>(apiURL, payload);
  }

  fetchAllLibrary(apiURL: string, payload: any = {}): Observable<any[]> {
    return this.http.put<any[]>(apiURL, payload);
  }
}