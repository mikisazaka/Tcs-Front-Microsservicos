import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'app/models/bookDetail.model';
import { BookDetailService } from 'app/services/book-detail.service';

@Component({
  selector: 'app-listar-livros',
  standalone: false,
  templateUrl: './listar-livros.component.html',
  styleUrl: './listar-livros.component.css'
})
export class ListarLivrosComponent implements OnInit {

  public allBooks: Book[] = [];
  public readonly apiBaseUrl = 'http://localhost:8887'

  constructor(
    private bookDetail: BookDetailService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.bookDetail.getLivros().subscribe({
      next: (livros) => {
        this.allBooks = livros;
      },
      error: (err) => {
        console.error('Falha ao carregar os livros:', err);
      }
    });
  }

  goToLivro(id: number) {
    this.router.navigate(['/livro/' + `${id}`])
  }

}
