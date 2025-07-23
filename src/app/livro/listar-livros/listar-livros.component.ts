import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'app/models/bookDetail.model';
import { BookDetailService } from 'app/services/book-detail.service';
import { SearchService } from 'app/services/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-livros',
  standalone: false,
  templateUrl: './listar-livros.component.html',
  styleUrl: './listar-livros.component.css'
})
export class ListarLivrosComponent implements OnInit {

  public allBooks: Book[] = [];
  public livrosExibicao: Book[] = []
  public readonly apiBaseUrl = 'http://localhost:8887'
  private searchSubscription!: Subscription

  constructor(
    private bookDetail: BookDetailService,
    public router: Router,
    public searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.bookDetail.getLivros().subscribe({
      next: (livros) => {
        this.allBooks = livros;
        this.livrosExibicao = livros;

        this.searchSubscription = this.searchService.termoBusca$.subscribe(term => {
          this.filterBooks(term);
        });

      },
      error: (err) => {
        console.error('Falha ao carregar os livros:', err);
      }
    });
  }

  filterBooks(searchTerm: string): void {
    if (!searchTerm) {
      this.livrosExibicao = this.allBooks;
    } else {
      this.livrosExibicao = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  goToLivro(id: number) {
    this.router.navigate(['/livro/' + `${id}`])
  }

}
