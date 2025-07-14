import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/bookDetail.model';
import { LikeService } from 'app/services/interactions/like.service';
import { catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-mostrar-livro',
  standalone: false,
  templateUrl: './mostrar-livro.component.html',
  styleUrl: './mostrar-livro.component.css'
})

export class MostrarLivroComponent implements OnInit {

  isLiked: boolean = false;

  livro$?: Observable<Book | null>
  API_URL = 'http://localhost:8887/book'
  public readonly apiBaseUrl = 'http://localhost:8887'

  constructor (
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService,
    public likeService: LikeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.livro$ = this.http.get<Book>(`${this.API_URL}/${id}`).pipe(
        tap((livro: Book) => {
          if (livro) {
            this.verificarStatusDoLike(livro.id);
          }
        }),
        catchError(error => {
          console.error('Livro não encontrado: ', error);
          return of(null);
        })
      );
    }
  }

  public verificarStatusDoLike(bookId: number): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.likeService.verificarLike(userId.toString(), bookId).subscribe(
        (resultado) => {
          this.isLiked = resultado;
        }
      );
    }
  }

  onLikeClick(bookId: number): void {
    const estadoAnterior = this.isLiked;

    this.isLiked = !this.isLiked;

    this.likeService.like(bookId).subscribe({
      next: () => {
      },
      error: (err) => {
        this.isLiked = estadoAnterior;  
      }
    });
  }

}