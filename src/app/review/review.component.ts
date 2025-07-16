import { Component } from '@angular/core';
import { Review } from 'app/models/review.model';
import { ReviewService } from 'app/services/review/review.service';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

export class ReviewComponent {

  constructor(
    public reviewService: ReviewService 
  ) {}

  listaReviews: Review[] = []

  ngOnInit(): void {
    this.reviewService.getReviewsUsuario().subscribe((value) => {
      this.listaReviews = value
    }) 
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

}
