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
  styleUrl: './mostrar-livro.component.css',
})
export class MostrarLivroComponent implements OnInit {
  isLiked: boolean = false;

  rating: number = 0;
  hoverRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  allReviews: Review[] = [];
  totalCount: number = 0;
  averageRating: number = 0;

  titulo: string = '';
  comentario: string = '';

  livro$?: Observable<Book | null>;
  API_URL = 'http://localhost:8887/book';
  public readonly apiBaseUrl = 'http://localhost:8887';

  constructor(
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
        catchError((error) => {
          console.error('Livro não encontrado: ', error);
          return of(null);
        })
      );
      this.reviewService.getReviewsLivro(parseInt(id)).subscribe((response) => {
        this.allReviews = response.reviews;
        this.totalCount = response.totalCount;
        this.averageRating = response.avg;
      });
    }
  }

  onStarHover(star: number): void {
    this.hoverRating = star;
  }

  onMouseLeave(): void {
    this.hoverRating = 0;
  }

  setRating(star: number): void {
    this.rating = star;
  }

  public verificarStatusDoLike(bookId: number): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.likeService
        .verificarLike(userId.toString(), bookId)
        .subscribe((resultado) => {
          this.isLiked = resultado;
        });
    }
  }

  onLikeClick(bookId: number): void {
    if (this.authService.isLoggedIn()) {
      const estadoAnterior = this.isLiked;

      this.isLiked = !this.isLiked;

      this.likeService.like(bookId).subscribe({
        next: () => {},
        error: (err) => {
          this.isLiked = estadoAnterior;
        },
      });
    } else {
      Swal.fire(
        'Acesso Negado',
        'Você precisa fazer login para curtir um livro.',
        'warning'
      );
    }
  }

  getStarArray(rating: number): string[] {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    if (halfStar) {
      stars.push('half');
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }

    return stars;
  }

  enviar() {
    // Verifica se o usuário está logado
    if (!this.authService.isLoggedIn()) {
      Swal.fire(
        'Por favor, faça login!',
        'Você precisa estar logado para fazer uma avaliação.',
        'warning'
      );

    } else if(this.rating < 1 || this.comentario == '') {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Por favor, preencha os campos obrigatórios.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.reviewService
          .registrarReview(
            parseInt(id),
            this.rating,
            this.titulo,
            this.comentario
          )
          .subscribe({
            next: (novaReview: Review) => {
              Swal.fire({
                icon: 'success',
                title: 'Avaliação enviada!',
                text: 'A sua avaliação foi registrada.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });

              this.allReviews.unshift(novaReview);

              this.totalCount++;

              this.titulo = '';
              this.comentario = '';
              this.rating = 0;
              this.hoverRating = 0;
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao salvar sua avaliação.',
              });
            },
          });
      }
    }
  }
}