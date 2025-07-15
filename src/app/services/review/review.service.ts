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
