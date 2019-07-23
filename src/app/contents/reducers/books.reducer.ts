
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Book } from '../models';
import { createReducer, on } from '@ngrx/store';
import { SearchApiActions } from '../actions'

export interface State extends EntityState<Book> {
  selectedBookId: string | null;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id
});

export const inititalState: State = adapter.getInitialState({
  selectedBookId: null
});

export const reducer = createReducer(
  inititalState,
  on(
    SearchApiActions.searchSuccess,
    (state, { books }) => adapter.addMany(books, state)
  ),
);

export const getSelectedId = (state: State) => state.selectedBookId;