import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'app/models/book.model';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-mostrar-livro',
  standalone: false,
  templateUrl: './mostrar-livro.component.html',
  styleUrl: './mostrar-livro.component.css'
})

export class MostrarLivroComponent implements OnInit {

  livro$?: Observable<Book | null>
  API_URL = 'http://localhost:8887/book'
  public readonly apiBaseUrl = 'http://localhost:8887'

  constructor (
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // 1. Pega o ID da URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.livro$ = this.http.get<Book>(`${this.API_URL}/${id}`).pipe(
        catchError(error => {
          console.error('Livro não encontrado: ', error);
          return of(null);
        })
      );
    }
  }

}
