import { Injectable } from "@angular/core";
import { Song } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";

@Injectable({ providedIn: 'root' })
export class SongService extends EntityCollectionServiceBase<Song> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Song', serviceElementsFactory);
  }
}
