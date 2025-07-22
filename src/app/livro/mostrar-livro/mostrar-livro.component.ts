import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/bookDetail.model';
import { List } from 'app/models/list.model';
import { Review } from 'app/models/review.model';
import { LikeService } from 'app/services/interactions/like.service';
import { ListService } from 'app/services/list/list.service';
import { ReviewService } from 'app/services/review/review.service';
import { initFlowbite } from 'flowbite';
import { catchError, Observable, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

type ReviewWithExpansion = Review & { isExpanded: boolean };

@Component({
  selector: 'app-mostrar-livro',
  standalone: false,
  templateUrl: './mostrar-livro.component.html',
  styleUrl: './mostrar-livro.component.css',
})

export class MostrarLivroComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  toggleDropdown() {
    const el = this.dropdownMenu.nativeElement;
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  }

  isLiked: boolean | null = null;
  livroId?: number;
  userId?: number;

  listaEscolhida: string = '';
  status = [
    { label: 'Lido', value: 'READ' },
    { label: 'Quero ler', value: 'WANT_TO_READ' }
  ];

  rating: number = 0;
  hoverRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  allReviews: ReviewWithExpansion[] = [];
  totalCount: number = 0;
  averageRating: number = 0;

  titulo: string = '';
  comentario: string = '';
  username: string = ''

  livro$?: Observable<Book | null>;
  API_URL = 'http://localhost:8887/book';
  public readonly apiBaseUrl = 'http://localhost:8887';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService,
    public likeService: LikeService,
    public reviewService: ReviewService,
    public listService: ListService
  ) { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(this.authService.isLoggedIn()) {
      this.username = this.authService.getUserName();
      this.userId = this.authService.getUserId();
    }

    if (id) {
      this.livro$ = this.http.get<Book>(`${this.API_URL}/${id}`).pipe(
        tap((livro: Book) => {
          this.livroId = livro.id;

          if (this.authService.isLoggedIn() && this.userId) {
            this.verificarStatusDoLike(livro.id);
          }

          this.listService.getChecklist(livro.id).subscribe({
            next: (checklist) => {
              this.listaEscolhida = checklist?.status ?? '';
            },
            error: (err) => {
              console.warn('Checklist não encontrado (ok):', err);
            }
          });
        }),
        catchError((error) => {
          console.error('Livro não encontrado: ', error);
          return of(null);
        })
      );
      this.reviewService.getReviewsLivro(parseInt(id)).subscribe((response) => {
        this.allReviews = response.reviews.map(review => ({
          ...review,     
          isExpanded: false  
        }));
        this.totalCount = response.totalCount;
        this.averageRating = response.avg;
      })
    }
  }

  toggleComment(review: any): void {
    review.isExpanded = !review.isExpanded;
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

  addLista() {
    if (this.authService.isLoggedIn()) {
      this.listService.adicionarLista(this.livroId!, this.listaEscolhida).subscribe({
        next: () => {
          Swal.fire(
            'Sucesso', 
            'Livro adicionado à sua checklist!', 
            'success'
          )
        },
        error: (err) => {
          Swal.fire(
            'Erro', 
            'Ocorreu um erro ao adicionar o livro.', 
            'error'
          );
        }
      });
    } else {
      Swal.fire(
        'Acesso Negado',
        'Você precisa fazer login para adicionar um livro em uma lista.',
        'warning'
      );
    }
  }

  delete(reviewId: number) {
    if (this.authService.isLoggedIn()) {
      this.reviewService.removeReview(reviewId).subscribe({
        next: () => {
          Swal.fire(
            'Sucesso!',
            'Sua avaliação foi excluída.',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        },
        error: (err) => {
          Swal.fire(
            'Erro!',
            'Erro ao concluir a ação.',
            'error'
          );
        }
      });
    }
  }

  onLikeClick(bookId: number): void {
    if (this.authService.isLoggedIn()) {
      const estadoAnterior = this.isLiked;

      this.isLiked = !this.isLiked;

      this.likeService.like(bookId).subscribe({
        next: () => { },
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
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else if (this.rating < 1 || this.comentario == '') {
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
            this.username,
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

              // this.allReviews.unshift(novaReview);

              // this.totalCount++;

              // this.titulo = '';
              // this.comentario = '';
              // this.rating = 0;
              // this.hoverRating = 0;

              window.location.reload()
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
