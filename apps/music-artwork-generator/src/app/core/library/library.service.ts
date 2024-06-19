import { Injectable } from "@angular/core";
import { Library } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";

@Injectable({ providedIn: 'root' })
export class LibraryService extends EntityCollectionServiceBase<Library> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Library', serviceElementsFactory);
  }

}
