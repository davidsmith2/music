import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Album } from "./album.interface";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AlbumService {
  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>('/api');
  }
}