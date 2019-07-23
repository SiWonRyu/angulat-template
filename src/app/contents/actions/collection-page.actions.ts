import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const loadCollections = createAction(
  '[Collection] Load Books',
);

export const removeBook = createAction(
  '[Search Book Page] Remove Book',
  props<{ book: Book }>()
);
