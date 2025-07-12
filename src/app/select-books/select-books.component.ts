import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'app/models/book.model';
import { BookService } from 'app/services/book/book.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-select-books',
  templateUrl: './select-books.component.html',
  styleUrl: './select-books.component.css',
  standalone : false,
})
export class SelectBooksComponent implements AfterViewInit, OnInit {

  livros: Book[] = [];

  constructor(private bookService: BookService, public router: Router) { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  ngOnInit(): void {
    this.bookService.getLivros().subscribe({
      next: (livros) => {
        this.livros = livros;
      }
    })
  }

  goToAdicionar() {
    this.router.navigate(['/adicionarLivro']);
  }

  goToEditar() {
    this.router.navigate(['/editarLivro']);
  }

  deletarLivro() {
    
  }

}