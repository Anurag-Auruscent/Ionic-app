import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Library, LibraryListServerResponse } from '../../model/library.model';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class LibraryService {

  libraryUrl = 'http://localhost:9000/library/get-libraries-with-weblinks';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  // getAllLibraries(apiURL: string): Observable<Library[]> {
  //   return this.http.get<Library[]>(apiURL);
  // }

  // get the token and create a header
  token = this.tokenService.getToken();

  headerOption = {
    'Authorization': `Bearer ${this.token}`
  };


  getAllLibraries(): Observable<LibraryListServerResponse> {
    const apiURL = environment.getAllLibrariesApiUrl;
    return this.http.get<LibraryListServerResponse>(apiURL);
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

  getLibraryLink(libraryId: string): Observable<any> {
    const apiUrlLibraryLink = `http://localhost:9000/library/request/generate-link?id=${libraryId}`;
    return this.http.get<any>(apiUrlLibraryLink);
  }

  // access request for library read
  readRequestAccessLibrary(libraryId: number): Observable<any> {
    const reqApiUrl = environment.readAccessRequestApiUrl;
    // const reqApiUrl = 'https://dc91-103-221-73-209.ngrok-free.app/library/request/read';
    return this.http.post(reqApiUrl, null, { 'headers': this.headerOption, params: { libraryId: libraryId.toString() }, observe: 'response' });
  }
}