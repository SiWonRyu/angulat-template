import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { BookStorageService } from 'src/app/core/services/book-storage.service';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import {
  CollectionApiActions,
  CollectionPageActions,
  SearchPageActions
} from '../actions'
import { Book } from '../models';


@Injectable()
export class CollectionEffects {

  constructor(
    private actions$: Actions,
    private storageService: BookStorageService
  ) {}

  checkStorageSuppored$ = createEffect(
    () => defer(() => this.storageService.supported()),
    {dispatch: false} 
  );

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CollectionPageActions.loadCollections),
        switchMap(() =>
        this.storageService.getCollection().pipe(
          map((books: Book[]) =>
              CollectionApiActions.collectionLoadSuccess({ books })
          ),
          catchError(error =>
              of(CollectionApiActions.collectionLoadFailure({ error }))
          )
        )
      )
    )
  );

  addBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchPageActions.addBook),
      mergeMap(({ book }) =>
        this.storageService.addToCollection([book]).pipe(
          map(() => CollectionApiActions.addBookSuccess({ book })),
          catchError(() => of(CollectionApiActions.addBookFailure({ book })))
        )
      )
    )
  );

removeBookFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionPageActions.removeBook),
      mergeMap(({ book }) =>
        this.storageService.removeFromCollection([book.id]).pipe(
          map(() => CollectionApiActions.removeBookSuccess({ book })),
          catchError(() => of(CollectionApiActions.removeBookFailure({ book })))
        )
      )
    )
  );


}