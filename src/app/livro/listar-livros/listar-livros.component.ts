import { Component, OnInit } from '@angular/core';
import { Book } from 'app/models/book.model';
import { BookService } from 'app/services/book/book.service';

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
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookService.getLivros().subscribe({
      next: (livros) => {
        this.allBooks = livros;
      },
      error: (err) => {
        console.error('Falha ao carregar os livros:', err);
      }
    });
  }

}