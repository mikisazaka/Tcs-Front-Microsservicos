import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Like } from 'app/models/like.model';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class LikeService {

  private readonly API_URL = 'http://localhost:8889'

  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) { }

  like(bookId: number): Observable<Like>{
    if(this.authService.isLoggedIn()) {
      const userId = this.authService.getUserId()
      
      const url = `${this.API_URL}/like/${userId}/${bookId}`;

      return this.http.post<Like>(url, null);
    } else {
      Swal.fire('Acesso Negado', 'Você precisa fazer login para curtir um livro.', 'warning');
      return EMPTY;
    }
  }

  verificarLike(userId: string, bookId: number): Observable<boolean> {
    const url = `${this.API_URL}/like/existe/${userId}/${bookId}`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

}
