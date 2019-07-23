import { createAction, props } from '@ngrx/store';
import { Book } from '../models';


export const searchSuccess = createAction(
  '[Search/API] Search Success',
  props<{ books: Book[] }>()
);

export const searchFailure = createAction(
  '[Search/API] Search Failure',
  props<{ errorMsg: string }>()
);