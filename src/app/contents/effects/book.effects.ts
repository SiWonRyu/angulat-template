import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { GoogleBooksService } from 'src/app/core/services/google-books.service';

import {
  SearchPageActions,
  SearchApiActions
} from '../actions'
import { debounceTime, switchMap, skip, takeUntil, map, catchError } from 'rxjs/operators';
import { Book } from '../models';


@Injectable()
export class BookEffects {

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService
  ) {}

  search$ = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(SearchPageActions.searchBooks),
        debounceTime(debounce, scheduler),
        switchMap(({query}) => {
          if (query === '') {
            return empty;
          }

          const nextSearch$ = this.actions$.pipe(
            ofType(SearchPageActions.searchBooks),
            skip(1)
          );

          return this.googleBooks.searchBooks(query).pipe(
            takeUntil(nextSearch$),
            map((books: Book[]) => SearchApiActions.searchSuccess({ books })),
            catchError(err => 
              of(SearchApiActions.searchFailure({ errorMsg: err }))
            )
          );
        })
      )
  );
}