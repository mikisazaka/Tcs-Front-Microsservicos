import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'app/models/review.model';
import { Observable, EMPTY } from 'rxjs';
import { ReviewResponse } from 'app/models/review-response';
import { AuthService } from 'app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private REVIEW_API_URL = 'http://localhost:8889/review'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getReviewsLivro(bookId: number): Observable<ReviewResponse> {
    const url = `${this.REVIEW_API_URL}/book/${bookId}`

    return this.http.get<ReviewResponse>(url);
  }

  registrarReview(bookId: number, rating: number, title: string, comment: string): Observable<Review>{
      if(this.authService.isLoggedIn()) {
        const userId = this.authService.getUserId()

        const body = {
          userId: userId,     
          bookId: bookId,   
          rating: rating,     
          title: title,
          comment: comment
        };
  
        return this.http.post<Review>(`${this.REVIEW_API_URL}/add`, body);
      } else {
        return EMPTY
      }
    }

}
