import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'app/models/bookDetail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BookDetail {
  private API_URL = 'http://localhost:8887/book';

  constructor(private http: HttpClient) {}

  getLivros(): Observable<Book[]> {
      return this.http.get<Book[]>(`${this.API_URL}`);
  }
}
