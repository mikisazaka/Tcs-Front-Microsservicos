// Em app/services/search/search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private busca = new BehaviorSubject<string>('');

  public termoBusca$ = this.busca.asObservable();

  public updateSearchTerm(term: string): void {
    this.busca.next(term);
  }
}
