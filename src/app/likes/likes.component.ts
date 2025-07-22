import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Book } from 'app/models/book.model';
import { Like } from 'app/models/like.model';
import { BookService } from 'app/services/book/book.service';
import { LikeService } from 'app/services/interactions/like.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
  standalone: false,
})
export class LikesComponent {
  listaLikes: Like[] = [];
  listBooks: Book[] = [];

  constructor(
    public auth: AuthService,
    public service: LikeService,
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

  ngOnInit(): void {
    this.service.listarLikes().subscribe((value) => {
        this.listaLikes = value;
        this.getListarLikes();
        this.getBook();
      },
    )
  }

  getImageUrl(imagePath: string | undefined): string {
    return imagePath
      ? `http://localhost:8887/images/${imagePath}`
      : 'https://via.placeholder.com/40';
  }

  getListarLikes(): void {
    this.service.listarLikes().subscribe((likes) => {
      this.listaLikes = likes;
    });
  }

  getBook(): void {
    for (let i = 0; i < this.listaLikes.length; i++) {
      let id = this.listaLikes[i].bookId;
      this.book.encontrarPorId(id).subscribe((livro) => {
        this.listBooks.push(livro);
      });
    }
  }

  goToBook(bookId: number | undefined) {
    this.router.navigate([`/livro/${bookId}`])
  }

}
