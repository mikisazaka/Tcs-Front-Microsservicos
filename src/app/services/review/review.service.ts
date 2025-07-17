import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { ReviewResponse } from 'app/models/review-response';
import { Review } from 'app/models/review.model';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private REVIEW_API_URL = 'http://localhost:8889/review';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getReviewsLivro(bookId: number): Observable<ReviewResponse> {
    const url = `${this.REVIEW_API_URL}/book/${bookId}`;

    return this.http.get<ReviewResponse>(url);
  }

  registrarReview(
    bookId: number,
    rating: number,
    title: string,
    comment: string
  ): Observable<Review> {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getUserId();
      const username = this.authService.getUserName()

      const body = {
        userId: userId,
        bookId: bookId,
        rating: rating,
        title: title,
        username: username,
        comment: comment,
      };

      return this.http.post<Review>(`${this.REVIEW_API_URL}/add`, body);
    } else {
      return EMPTY;
    }
  }

  getReviewsUsuario(): Observable<Review[]> {
    const userId = this.authService.getUserId()

    return this.http.get<Review[]>(`${this.REVIEW_API_URL}/user/${userId}`);
  }
}
