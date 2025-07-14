import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'app/models/bookDetail.model';
import { BookReview } from 'app/models/bookReview.model';
import { Review } from 'app/models/review.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BookDetailService {
  private API_URL = 'http://localhost:8887/book';

  constructor(private http: HttpClient) {}

  getLivros(): Observable<Book[]> {
      return this.http.get<Book[]>(`${this.API_URL}`);
  }

}