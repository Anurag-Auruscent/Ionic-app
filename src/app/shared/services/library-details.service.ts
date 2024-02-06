import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Library } from '../../model/library.model';

@Injectable()
export class LibraryDetailsService {
  constructor(
    private http: HttpClient
  ) { }

  updateLibrary(apiURL: string, payload: any = {}): Observable<any[]> {
    return this.http.put<any[]>(apiURL, payload);
  }
}