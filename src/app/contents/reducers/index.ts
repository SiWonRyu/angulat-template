import * as fromSearch from './search.reducer';
import * as fromBooks from './books.reducer';
import * as fromCollection from './collections.reducer';
import * as fromRoot from '../../reducers';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../models';

export interface BooksState {
  search: fromSearch.State,
  books: fromBooks.State,
  collection: fromCollection.State
};

export interface State extends fromRoot.State {
  books: BooksState
}

export function reducers(state: BooksState | undefined, action: Action) {
  return combineReducers({
    search: fromSearch.reducer,
    books: fromBooks.reducer,
    collection: fromCollection.reducer
  })(state, action);
}

export const getBooksState = createFeatureSelector<State, BooksState>('books');

export const getBookEntitiesState = createSelector(
  getBooksState,
  state => state.books
);

export const getSelectedBookId = createSelector(
  getBookEntitiesState,
  fromBooks.getSelectedId
);``

export const {
  selectIds: getBookIds,
  selectEntities: getBookEntities,
  selectAll: getAllBooks,
  selectTotal: getTotalBooks
} = fromBooks.adapter.getSelectors(getBookEntitiesState);

export const getSelectedBook = createSelector(
  getBookEntities,
  getSelectedBookId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSearchState = createSelector(
  getBooksState,
  (state: BooksState) => state.search
);

export const getSearchBookIds = createSelector(
  getSearchState,
  fromSearch.getIds
);

export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);

export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);


export const getSearchResults = createSelector(
  getBookEntities,
  getSearchBookIds,
  (books, searchIds) => {
    return searchIds
      .map(id => books[id])
      .filter((book): book is Book => book != null);
  }
);

export const getCollectionState = createSelector(
  getBooksState,
  (state: BooksState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionBookIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getBookCollection = createSelector(
  getBookEntities,
  getCollectionBookIds,
  (entities, ids) => {
    return ids
      .map(id => entities[id])
      .filter((book): book is Book => book != null);
  }
);


