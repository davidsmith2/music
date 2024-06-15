import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Library } from "@davidsmith/api-interfaces";

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private readonly apiRoot: string = '/api';

  constructor(private httpClient: HttpClient) {}

  getLibrary(): Observable<Library> {
    return this.httpClient.get<Library>(`${this.apiRoot}/library`);
  }

}
