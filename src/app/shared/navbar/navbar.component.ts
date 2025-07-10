import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
  
export class NavbarComponent {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/telaInicial']);
  }

  goToLivros() {
    this.router.navigate(['/']);
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
}
