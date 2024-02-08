import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Library } from '../../model/library.model';

@Injectable()
export class LibraryService {

  libraryUrl = 'http://localhost:9000/library/get-libraries-with-weblinks';

  constructor(
    private http: HttpClient
  ) { }

  getAllLibraries(apiURL: string): Observable<Library[]> {
    return this.http.get<Library[]>(apiURL);
  }

  getLibraryById(apiURL: string): Observable<Library> {
    return this.http.get<Library>(apiURL);
  }

  updateLibrary(apiURL: string, payload: any = {}): Observable<any[]> {
    return this.http.put<any[]>(apiURL, payload);
  }

  deleteLibrary(apiURL: string): Observable<any[]> {
    return this.http.delete<any[]>(apiURL);
  }

  createNewLibrary(apiURL: string, payload: any = {}): Observable<any[]> {
    console.log(payload, '/n', apiURL);
    return this.http.post<any[]>(apiURL, payload);
  }
}