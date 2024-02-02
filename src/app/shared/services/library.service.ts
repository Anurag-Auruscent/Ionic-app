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
}