import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/bookDetail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private API_URL = 'http://localhost:8886/recommendations';

  constructor(private http: HttpClient, public authService: AuthService) { }

  getRecomendacoes(): Observable<Book[]> {
    const userId = this.authService.getUserId();
    return this.http.get<Book[]>(`${this.API_URL}/${userId}`);
  }
}
