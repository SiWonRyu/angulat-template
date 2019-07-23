import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../models';

import * as fromBooks from '../../reducers';
import { CollectionPageActions } from '../../actions';


@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionPageComponent {

  bookCollection$: Observable<Book[]>;

  constructor(private store: Store<fromBooks.State>) { 
    this.bookCollection$ = this.store.pipe(select(fromBooks.getBookCollection))
  }
  
  remove(book: Book) {
    if (confirm('삭제 하시겠습니까?')) {
      this.store.dispatch(CollectionPageActions.removeBook({ book }))
    }
  }

}
