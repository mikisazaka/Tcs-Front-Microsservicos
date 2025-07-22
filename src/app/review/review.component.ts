import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Review } from 'app/models/review.model';
import { ReviewService } from 'app/services/review/review.service';
import Swal from 'sweetalert2';

type ReviewWithExpansion = Review & { isExpanded: boolean };

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

export class ReviewComponent {

  constructor(
    public reviewService: ReviewService,
    public router: Router,
    public authService: AuthService
  ) {}

  listaReviews: ReviewWithExpansion[] = []
  public readonly apiBaseUrlLivro = 'http://localhost:8887'

  ngOnInit(): void {
    this.reviewService.getReviewsUsuario().subscribe((value) => {
      this.listaReviews = value.map(review => ({
        ...review,
        isExpanded: false 
      }));
    }) 
  }

  toggleComment(review: any): void {
    review.isExpanded = !review.isExpanded;
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

  goToLivros() {
    this.router.navigate(['/telaInicial'])
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

}
