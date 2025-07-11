import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'http://localhost:8887/book'

  constructor(private http: HttpClient) { }

  registrarLivro(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  getLivros(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}`);
  }

  removerLivro(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.API_URL}/remove/${id}`);
  }

  editarLivro(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.API_URL}/edit/${id}`, book);
  }

  encontrarPorId(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }
}
