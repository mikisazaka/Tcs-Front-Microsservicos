import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'app/models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private REVIEW_API_URL = 'http://localhost:8889/review'

  constructor(
    private http: HttpClient
  ) { }

  getReviewsLivro(bookId: number): Observable<Review[]> {
    const url = `${this.REVIEW_API_URL}/book/${bookId}`

    return this.http.get<Review[]>(url);
  }

}
