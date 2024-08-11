import { MetaReducer } from '@ngrx/store';
import { ngrxEntityRelationshipReducer } from 'ngrx-entity-relationship';

export const metaReducers: MetaReducer<any>[] = [
  ngrxEntityRelationshipReducer,
];
