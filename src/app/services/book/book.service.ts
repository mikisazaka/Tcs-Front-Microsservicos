import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'app/models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private API_URL = 'http://localhost:8887/book'

  constructor(private http: HttpClient) { }

  registrarLivro(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  getLivros(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL);
  }
}
