import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BookService} from '../../../../services/services/book.service';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookResponse} from '../../../../services/models/book-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookListComponent implements OnInit {
  private likedBooks = new Set<number>();
  toggleLike(book: BookResponse) {
    const id = book.id as number;
    this.likedBooks.has(id) ? this.likedBooks.delete(id) : this.likedBooks.add(id);
  }

  isLiked(book: BookResponse): boolean {
    return this.likedBooks.has(book.id as number);
  }

  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
    this.bookResponse = {
      content: [
        {
          id: 1,
          title: 'The Giver',
          authorName: 'Lois Lowry',
          rate: 5,
          shareable: true,
          archived: false,
          isbn: '978-0-395-64566-6',
          synopsis: 'A boy discovers the dark secrets of his seemingly perfect community.',
          cover: []
        },
        {
          id: 2,
          title: 'To Kill a Mockingbird',
          authorName: 'Harper Lee',
          rate: 4,
          shareable: true,
          archived: false,
          isbn: '978-0-06-112008-4',
          synopsis: 'A story of racial injustice and loss of innocence in the American South.',
          cover: []
        },
        {
          id: 3,
          title: '1984',
          authorName: 'George Orwell',
          rate: 3,
          shareable: false,
          archived: true,
          isbn: '978-0-452-28423-4',
          synopsis: 'A dystopian novel about totalitarianism and surveillance.',
          cover: []
        }
      ],
      totalElements: 3,
      totalPages: 1,
      first: true,
      last: true,
      number: 0,
      size: 5
    };
    this.pages = [0];
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  borrowBook(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  displayBookDetails(book: BookResponse) {
    this.router.navigate(['books', 'details', book.id]);
  }
}
