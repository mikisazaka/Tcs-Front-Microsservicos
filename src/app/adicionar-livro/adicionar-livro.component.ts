import { Component, AfterViewInit } from '@angular/core';
import { Book } from 'app/models/book.model';
import { BookService } from 'app/services/book/book.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-adicionar-livro',
  standalone: false,
  templateUrl: './adicionar-livro.component.html',
  styleUrl: './adicionar-livro.component.css'
})
export class AdicionarLivroComponent implements AfterViewInit {

  book: Book = {
    id: 0, title: '', author: '', publishedYear: 0, genre: '',
    pagesQuantity: 0, contentRating: '', image: null
  };
  selectedGenre: string = "";
  selectedContentRating: string = "";

  constructor(private bookService: BookService) { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  selecionarGenero(generoEscolhido: string) {
    this.selectedGenre = generoEscolhido;
  }

  selecionarClassificacao(classificacao: string) {
    this.selectedContentRating = classificacao;
  }

  enviarFormulario() {
    this.bookService.registrarLivro(this.book).subscribe({
      next: (value) => {
        this.book = {
          id: 0, title: '', author: '', publishedYear: 0, genre: '',
          pagesQuantity: 0, contentRating: '', image: null
        };
      }
    })
  }
}
