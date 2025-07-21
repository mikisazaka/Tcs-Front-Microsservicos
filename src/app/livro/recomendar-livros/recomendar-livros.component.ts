import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'app/services/book/book.service';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendar-livros',
  standalone: false,
  templateUrl: './recomendar-livros.component.html',
  styleUrls: ['./recomendar-livros.component.css']
})
export class RecomendarLivrosComponent implements OnInit {
  recommendedBooks: Book[] = [];
  apiBaseUrl = 'http://localhost:8080/api';

  constructor(
    private livroService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId()
    this.livroService.getRecomendados(userId).subscribe({
      next: (books: Book[]) => (this.recommendedBooks = books),
      error: (err: any) => console.error('Erro ao carregar recomendações:', err)
    });
  }

 goToLivro(id: number | undefined): void {
  if (id !== undefined) {
    this.router.navigate(['/livro', id]);
  }
}
}
