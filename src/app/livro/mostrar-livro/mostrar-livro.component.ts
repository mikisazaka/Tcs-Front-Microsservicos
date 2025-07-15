import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/bookDetail.model';
import { Review } from 'app/models/review.model';
import { LikeService } from 'app/services/interactions/like.service';
import { ReviewService } from 'app/services/review/review.service';
import { catchError, Observable, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-livro',
  standalone: false,
  templateUrl: './mostrar-livro.component.html',
  styleUrl: './mostrar-livro.component.css'
})

export class MostrarLivroComponent implements OnInit {

  isLiked: boolean = false;
  allReviews: Review[] = []

  livro$?: Observable<Book | null>
  API_URL = 'http://localhost:8887/book'
  public readonly apiBaseUrl = 'http://localhost:8887'

  constructor (
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService,
    public likeService: LikeService,
    public reviewService: ReviewService
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
      this.reviewService.getReviewsLivro(parseInt(id)).subscribe({
        next: (reviews) => {
          this.allReviews = reviews;
        },
        error: (err) => {
        }
      });
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
    if(this.authService.isLoggedIn()) {
      const estadoAnterior = this.isLiked;

      this.isLiked = !this.isLiked;

      this.likeService.like(bookId).subscribe({
        next: () => {
        },
        error: (err) => {
          this.isLiked = estadoAnterior;  
        }
      });
    } else {
      Swal.fire('Acesso Negado', 'Você precisa fazer login para curtir um livro.', 'warning');
    }
  }

}