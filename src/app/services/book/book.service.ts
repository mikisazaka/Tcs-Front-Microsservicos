import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from 'app/models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  livrosCache: Book[] = [];
  private readonly API_URL = 'http://localhost:8887/book'

  constructor(private http: HttpClient) { }

  registrarLivro(title: string, author: string, publishedYear: number,
    pagesQuantity: number, gender: string, contentRating: string, image: File
  ): Observable<Book> {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishedYear', publishedYear.toString());
    formData.append('pagesQuantity', pagesQuantity.toString());
    formData.append('gender', gender);
    formData.append('contentRating', contentRating);
    if (image) {
      formData.append('file', image);
    }

    return this.http.post<Book>(`${this.API_URL}/register`, formData);
  }

  getLivros(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}`).pipe(
      tap(livros => this.livrosCache = livros)
    );
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
