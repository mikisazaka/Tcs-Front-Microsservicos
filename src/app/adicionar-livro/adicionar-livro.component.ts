import { V } from '@angular/cdk/keycodes';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
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
    pagesQuantity: 0, contentRating: 'DEZ', image: null
  };
  genres = ['Romance', 'Terror', 'Fantasia', 'Drama', 'Mistério', 'Suspense'];
  contentRatings = [
    { label: 'Livre', value: 'LIVRE' },
    { label: '10', value: 'DEZ' },
    { label: '12', value: 'DOZE' },
    { label: '14', value: 'QUATORZE' },
    { label: '16', value: 'DEZESSEIS' },
    { label: '18', value: 'DEZOITO' }
  ];
  selectedGenre: string = "Terror";
  selectedContentRating: string = "10";

  isIncomplete: boolean = false;
  errorMessage: string = "";

  constructor(
    public router: Router,
    private bookService: BookService,
    public authService: AuthService
  ) { }

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

  validarCampos() {
    if (!this.book.image) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Imagem");
    }
    if (this.book.title.trim().length == 0) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Título");
    }
    if (this.book.author.trim().length == 0) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Autor");
    }
    if (this.book.publishedYear <= 0) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Ano de publicação (inválido)");
    }
    if (this.book.gender.trim().length == 0) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Gênero");
    }
    if (this.book.pagesQuantity <= 0) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Quantidade de páginas (inválido)");
    }
    if (this.book.contentRating.trim().length == 0) {
      this.isIncomplete = true;
      this.errorMessage = this.errorMessage.concat("<br>- Classificação indicativa");
    }
  }

  enviarFormulario() {
    this.validarCampos();
    if (this.isIncomplete) {
      Swal.fire({
        icon: 'error',
        title: 'Campos não preenchidos',
        html: this.errorMessage,
      });
      this.isIncomplete = false;
    } else {
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
            pagesQuantity: 0, contentRating: 'DEZ', image: null
          };

          this.router.navigate(['/selectBooks']);
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
}
