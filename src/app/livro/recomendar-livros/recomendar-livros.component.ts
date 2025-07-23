import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'app/services/book/book.service';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/book.model';
import { Router } from '@angular/router';
import { RecommendationService } from 'app/services/recommendation/recommendation.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recomendar-livros',
  standalone: false,
  templateUrl: './recomendar-livros.component.html',
  styleUrls: ['./recomendar-livros.component.css']
})
export class RecomendarLivrosComponent implements OnInit {
  recommendedBooks: Book[] = [];
  apiBaseUrl = 'http://localhost:8887';

  constructor(
    private bookService: BookService,
    public authService: AuthService,
    private recommendationService: RecommendationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.recommendationService.getRecomendacoes().subscribe({
      next: (books) => {
        const observables = books.map(book => 
          this.bookService.encontrarPorId(book.id)
        );

        forkJoin(observables).subscribe({
          next: (detalhes) => {
            this.recommendedBooks = detalhes;
          },
          error: (err) => {
            console.error('Erro ao buscar detalhes:', err)
          }
        })
      },
      error: (err) => {
        console.error('Erro ao carregar recomendações:', err)
      }
    });
  }

  isEmpty(): boolean {
    if(this.recommendedBooks.length == 0) {
      return true;
    } return false;
  }

  goToLivro(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/livro', id]);
    }
  }
}
