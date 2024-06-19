import { ActionReducer, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { ngrxEntityRelationshipReducer } from 'ngrx-entity-relationship';

export function logger(reducer: ActionReducer<any>): any {
  // Customize the logger
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<any>[] = [logger, ngrxEntityRelationshipReducer];