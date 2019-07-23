import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const collectionLoadSuccess = createAction(
  '[Collection/API] Collection Load Success',
  props<{books: Book[]}>()
);

export const collectionLoadFailure = createAction(
  '[Collection/API] Collection Load Failure',
  props<{ error: any }>()
);

export const addBookSuccess = createAction(
  '[Collection/API] Add Book Success',
  props<{ book: Book }>()
);

export const addBookFailure = createAction(
  '[Collection/API] Add Book Failure',
  props<{ book: Book }>()
);

export const removeBookSuccess = createAction(
  '[Collection/API] Remove Book Success',
  props<{ book: Book }>()
);

export const removeBookFailure = createAction(
  '[Collection/API] Remove Book Failure',
  props<{ book: Book }>()
);