import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Library } from '../../model/library.model';

@Injectable()
export class HomeService {
  constructor(
    private http: HttpClient
  ) { }

  createNewLibrary(payload: any, apiURL: string): Observable<any[]> {
    return this.http.post<any[]>(payload, apiURL);
  }

  fetchAllLibrary(apiURL: string, payload: any = {}): Observable<any[]> {
    return this.http.put<any[]>(apiURL, payload);
  }
}