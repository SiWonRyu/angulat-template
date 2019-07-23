import { createReducer, on } from '@ngrx/store';
import { 
  SearchApiActions,
  SearchPageActions 
} from '../actions' 

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: ''
};

export const reducer = createReducer(
  initialState,
  on(SearchPageActions.searchBooks, (state, { query }) => {
    return query === ''
      ? {
        ids: [],
        loading: false,
        error: '',
        query
      } :
      {
        ...state,
        loading: true,
        error: '',
        query
      };
  }),
  on(SearchApiActions.searchSuccess, (state, { books }) => ({
    ids: books.map(book => book.id),
    loading: false,
    error: '',
    query: state.query
  })),
  on(SearchApiActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg
  }))
);

export const getIds = (state: State) => state.ids;
export const getQuery = (state: State) => state.query;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
