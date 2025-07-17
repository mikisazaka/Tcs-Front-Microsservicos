import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { List } from 'app/models/list.model';
import { Observable, EMPTY, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly API_URL = 'http://localhost:8889/checklist';

  listsCache: List[] = [];

  constructor(private http: HttpClient, public authService: AuthService) {}

  list(bookId: number, status: String): Observable<List> {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getUserId();

      const url = `${this.API_URL}/checklistUsuario/${userId}/${status}`;

      return this.http.post<List>(url, null);
    } else {
      Swal.fire(
        'Acesso Negado',
        'Você precisa fazer login para adicionar um livro à lista.',
        'warning'
      );
      return EMPTY;
    }
  }

    listarCheckList(): Observable<List[]> {
      const userId = this.authService.getUserId();
      const url = `${this.API_URL}/checklistUsuario/${userId}`;
      return this.http.get<List[]>(url);
    }

    getStatus(userId: number, status: string): Observable<List[]> {
      return this.http.get<List[]>(`${this.API_URL}/checklistUsuario/${userId}`);
    }
  }
