import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromBooks from '../../reducers';
import { SearchPageActions, SearchApiActions } from '../../actions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Book } from '../../models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {

  searchQuery$: Observable<string>;
  loading$: Observable<boolean>;
  books$: Observable<Book[]>;

  constructor(private store: Store<fromBooks.State>) { 
    this.searchQuery$ = this.store.pipe(
      select(fromBooks.getSearchQuery),
      take(1)
    );
    this.books$ = this.store.pipe(select(fromBooks.getSearchResults));
    this.loading$ = this.store.pipe(select(fromBooks.getSearchLoading));
  }

  search(query: string) {
    this.store.dispatch(SearchPageActions.searchBooks({ query }));
  }

  addBook(book: Book) {
    if (confirm('추가하시겠습니까?')) {
      this.store.dispatch(SearchPageActions.addBook({ book }));
    }
  }

}
