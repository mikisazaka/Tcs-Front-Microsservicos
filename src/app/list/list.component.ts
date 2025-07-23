import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/book.model';
import { List } from 'app/models/list.model';
import { LivroComStatus } from 'app/models/livroComStatus.model';
import { BookService } from 'app/services/book/book.service';
import { ListService } from 'app/services/list/list.service';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';
// import { Status } from 'app/models/status.enum'; // Removido pois não é mais usado

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: false,
})
export class ListComponent implements OnInit {
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  toggleDropdown() {
    const el = this.dropdownMenu.nativeElement;
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  }

  livrosComStatus: LivroComStatus[] = [];
  listBooks: Book[] = [];
  listaCheckList: List[] = [];
  filtroStatus: string = '';

  constructor(
    public auth: AuthService,
    public service: ListService,
    public book: BookService
  ) { }

  status = [
    { label: 'Todos', value: '' },
    { label: 'Lido', value: 'READ' },
    { label: 'Para ler', value: 'WANT_TO_READ' }
  ];

  statusColors: { [key: string]: string } = {
    '': 'bg-gray-100 text-gray-800',
    READ: 'bg-green-100 text-green-800',
    WANT_TO_READ: 'bg-yellow-100 text-yellow-800',
  };

  contentRatings = [
    { label: 'Todos', value: '' },
    { label: 'Livre', value: 'LIVRE' },
    { label: '10', value: 'DEZ' },
    { label: '12', value: 'DOZE' },
    { label: '14', value: 'QUATORZE' },
    { label: '16', value: 'DEZESSEIS' },
    { label: '18', value: 'DEZOITO' },
  ];

  contentRatingLabels: { [key: string]: string } = {
    LIVRE: 'Livre',
    DEZ: '10',
    DOZE: '12',
    QUATORZE: '14',
    DEZESSEIS: '16',
    DEZOITO: '18',
  };

  contentRatingColors: { [key: string]: string } = {
    '': 'bg-gray-100 text-gray-800',
    LIVRE: 'bg-green-100 text-green-800',
    DEZ: 'bg-blue-100 text-blue-800',
    DOZE: 'bg-yellow-100 text-yellow-800',
    QUATORZE: 'bg-orange-100 text-orange-800',
    DEZESSEIS: 'bg-red-100 text-red-800',
    DEZOITO: 'bg-black text-white',
  };

  selecionarStatus(statusEscolhido: string): void {
    this.filtroStatus = statusEscolhido;
  }

  getImageUrl(imagePath: string | undefined): string {
    return imagePath
      ? `http://localhost:8887/images/${imagePath}`
      : 'https://via.placeholder.com/40';
  }

  ngOnInit(): void {
    this.service.listarSemStatus().subscribe((value => {
      this.listaCheckList = value;
      // this.getList();
      this.getBook();
    }))
  }

  listarPorStatus(): void {
    if (this.filtroStatus === '') {
      this.service.listarSemStatus().subscribe((value) => {
        this.listaCheckList = value;
        this.getBook();
      });
    } else {
      this.service.listarPorStatus(this.filtroStatus).subscribe((value) => {
        this.listaCheckList = value;
        this.getBook();
      });
    }
  }

  /*getList(): void {
    this.service.listar().subscribe((lists) =>{
      this.listaCheckList = lists;
    })
  }*/

  getBook(): void {
    this.livrosComStatus = [];

    const observables = this.listaCheckList.map(item =>
      this.book.encontrarPorId(item.bookId).pipe(
        // Retorna um objeto com livro e status corretamente pareado
        map(livro => ({ livro, status: item.status }))
      )
    );

    forkJoin(observables).subscribe((resultados) => {
      this.livrosComStatus = resultados;
    });
  }

  hasLivro(book: Book): boolean {
    for (let i = 0; i < this.listBooks.length; i++) {
      let livro = this.listBooks[i];
      if (livro.id === book.id) {
        return true;
      }
    } return false;
  }

  deletarLivro(bookId: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja prosseguir com a remoção do livro?',
      showDenyButton: true,
      confirmButtonText: 'SIM',
      denyButtonText: 'NÃO'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletar(bookId).subscribe({
          next: () => {
            this.listaCheckList = this.listaCheckList.filter(c => c.bookId !== bookId);
            this.listBooks = this.listBooks.filter(b => b.id !== bookId);

            Swal.fire({
              icon: 'success',
              title: 'Livro removido com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });

            this.listarPorStatus();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro real:', err);
            console.error('Status:', err.status);
            console.error('Mensagem:', err.message);
            console.error('Body:', err.error);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao remover da lista',
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
}
