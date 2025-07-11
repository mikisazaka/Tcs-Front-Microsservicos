import { Component, AfterViewInit } from '@angular/core';
import { Book } from 'app/models/book.model';
import { BookService } from 'app/services/book/book.service';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-livro',
  standalone: false,
  templateUrl: './adicionar-livro.component.html',
  styleUrl: './adicionar-livro.component.css'
})
export class AdicionarLivroComponent implements AfterViewInit {

  book: Book = {
    title: '', author: '', publishedYear: 0, gender: 'Terror',
    pagesQuantity: '', contentRating: '10', image: undefined
  };
  genres = ['Romance', 'Terror', 'Fantasia', 'Drama', 'Mistério', 'Suspense'];
  contentRatings = ['Livre', '10', '12', '14', '16', '18'];
  selectedGenre: string = "Terror";
  selectedContentRating: string = "10";

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

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.book.image = target.files[0];
    }
  }

  enviarFormulario() {
    this.bookService.registrarLivro(this.book.title, this.book.author, this.book.publishedYear,
      this.book.pagesQuantity, this.book.gender, this.book.contentRating, this.book.image!
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'O livro foi adicionado com sucesso.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });

        this.book = {
          title: '', author: '', publishedYear: 0, gender: 'Terror',
          pagesQuantity: '', contentRating: '10', image: undefined
        };
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar',
          text: 'Verifique os dados ou tente novamente.',
        });
      }
    })
  }
}
