import { createAction, props } from '@ngrx/store';
import { Book } from '../models';


export const searchBooks = createAction(
  '[Search Book Page] Search Books',
  props<{ query: string }>()
);

export const addBook = createAction(
  '[Search Book Page] Add Book',
  props<{ book: Book }>()
);

