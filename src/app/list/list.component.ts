import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/book.model';
import { List } from 'app/models/list.model';
import { BookService } from 'app/services/book/book.service';
import { ListService } from 'app/services/list/list.service';
// import { Status } from 'app/models/status.enum'; // Removido pois não é mais usado

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: false,
})
export class ListComponent implements OnInit {
  listBooks: Book[] = [];
  listaCheckList: List[] = [];

  constructor(
    public auth: AuthService,
    public service: ListService,
    public book: BookService,
    public router: Router
  ) {}

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

  getImageUrl(imagePath: string | undefined): string {
    return imagePath
      ? `http://localhost:8887/images/${imagePath}`
      : 'https://via.placeholder.com/40';
  }

  ngOnInit(): void {
    this.service.listarSemStatus().subscribe((value =>{
      this.listaCheckList = value;
      // this.getList();
      this.getBook();
    }))
  }

  /*getList(): void {
    this.service.listar().subscribe((lists) =>{
      this.listaCheckList = lists;
    })
  }*/

  getBook(): void {
    for (let i = 0; i < this.listaCheckList.length; i++) {
      let id = this.listaCheckList[i].bookId;
      this.book.encontrarPorId(id).subscribe((livro) => {
        this.listBooks.push(livro);
      });
    }
  }

  goToBook(bookId: number | undefined) {
    this.router.navigate([`/livro/${bookId}`])
  }
}
