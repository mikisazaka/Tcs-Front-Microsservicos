import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/book.model';
import { BookService } from 'app/services/book/book.service';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-books',
  templateUrl: './select-books.component.html',
  styleUrl: './select-books.component.css',
  standalone: false,
})
export class SelectBooksComponent implements AfterViewInit, OnInit {

  livros: Book[] = [];
  filtroTitulo: string = '';

  contentRatingLabels: { [key: string]: string } = {
    LIVRE: 'Livre',
    DEZ: '10',
    DOZE: '12',
    QUATORZE: '14',
    DEZESSEIS: '16',
    DEZOITO: '18'
  };

  contentRatingColors: { [key: string]: string } = {
    LIVRE: 'bg-green-100 text-green-800',
    DEZ: 'bg-blue-100 text-blue-800',
    DOZE: 'bg-yellow-100 text-yellow-800',
    QUATORZE: 'bg-orange-100 text-orange-800',
    DEZESSEIS: 'bg-red-100 text-red-800',
    DEZOITO: 'bg-black text-white'
  };

  constructor(
    private bookService: BookService,
    public router: Router,
    public authService: AuthService
  ) { }


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

  goToEditar(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/editarLivro', id]);
    }
  }

  deletarLivro(id: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja prosseguir com a remoção do livro?',
      showDenyButton: true,
      confirmButtonText: 'SIM',
      denyButtonText: 'NÃO'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.removerLivro(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Livro removido com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });
            this.livros = this.livros.filter((l: Book) => l.id !== id);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao remover o livro',
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'Remoção cancelada',
          showConfirmButton: false,
          timer: 1200
        });
      }
    })
  }

  getImageUrl(imagePath: string | undefined): string {
    return imagePath ? `http://localhost:8887/images/${imagePath}` : 'https://via.placeholder.com/40';
  }

  get livrosFiltrados(): Book[] {
    if (!this.filtroTitulo) return this.livros;

    return this.livros.filter((livro) =>
      livro.title.toLowerCase().includes(this.filtroTitulo.toLowerCase())
    );
  }

}
