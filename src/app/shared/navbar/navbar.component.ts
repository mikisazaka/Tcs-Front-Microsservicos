import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { SearchService } from 'app/services/search/search.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(
    public router: Router,
    public authService: AuthService,
    public searchService: SearchService
  ) { }

  goToHome() {
    this.router.navigate(['/telaInicial']);
  }

  goToBooks() {
    this.router.navigate(['/selectBooks'])
  }

  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }

  goToAdminPage() {
    this.router.navigate(['/admin'])
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  goToLikes() {
    this.router.navigate(['/like'])
  }

  goToReviews() {
    this.router.navigate([`/reviews`])
  }

  goToList() {
    this.router.navigate([`/list`])
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.searchService.updateSearchTerm(searchTerm);
  }
}
