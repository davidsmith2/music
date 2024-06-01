import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Album } from "../album.interface";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AlbumsResolverService implements Resolve<Array<Album>>{
  constructor(private httpClient: HttpClient) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Album>> {
    return this.httpClient.get<Array<Album>>('/api');
  }
}
