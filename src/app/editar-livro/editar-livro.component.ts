import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'app/models/book.model';
import { BookService } from 'app/services/book/book.service';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-livro',
  standalone: false,
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent implements AfterViewInit {

  book: Book = {
    title: '', author: '', publishedYear: 0, gender: '',
    pagesQuantity: 0, contentRating: '', image: undefined
  };
  genres = ['Romance', 'Terror', 'Fantasia', 'Drama', 'Mistério', 'Suspense'];
  selectedGenre: string = "Terror";

  constructor(private route: ActivatedRoute, public router: Router, private bookService: BookService) { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      Swal.fire({ icon: 'error', title: 'ID inválido na URL' });
      this.router.navigate(['/selectBooks']);
      return;
    }

    this.bookService.encontrarPorId(id).subscribe({
      next: (livro) => {
        this.book = livro;
        this.selectedGenre = livro.gender;
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Erro ao carregar livro' });
        this.router.navigate(['/selectBooks']);
      }
    });
  }

  selecionarGenero(generoEscolhido: string) {
    this.selectedGenre = generoEscolhido;
  }

  enviarFormulario() {
    this.bookService.editarLivro(this.book.id!, this.book).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Edição realizada!',
          text: 'O livro foi atualizado com sucesso.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });

        this.book = {
          title: '', author: '', publishedYear: 0, gender: 'Terror',
          pagesQuantity: 0, contentRating: '10', image: undefined
        };

        this.router.navigate(['/selectBooks']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao editar',
          text: 'Verifique os dados ou tente novamente.',
        });
      }
    })
  }

}
