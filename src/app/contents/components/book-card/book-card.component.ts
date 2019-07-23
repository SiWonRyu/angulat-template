import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  
  @Input() book: Book;
  @Input() isSearch: boolean = true;
  @Output() addBook = new EventEmitter<Book>();
  @Output() removeBook = new EventEmitter<Book>();

  add() {
    this.addBook.emit(this.book);
  }
  
  remove() {
    this.removeBook.emit(this.book);
  }

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get authors() {
    return this.book.volumeInfo.authors;
  }

  get thumbnail() {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace(
        'http:',
        ''
      );
    }
    return false;
  }

}
