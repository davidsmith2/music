import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Album } from "../album.interface";
import { Observable, of } from "rxjs";

@Injectable()
export class AlbumResolverService implements Resolve<Album>{
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Album> {
    return of({
      artist: route.queryParamMap.get('artist'),
      album: route.queryParamMap.get('album')
    });
  }
}
