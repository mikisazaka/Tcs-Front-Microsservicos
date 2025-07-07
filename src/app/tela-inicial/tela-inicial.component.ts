import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-inicial',
  standalone: false,
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css'
})
export class TelaInicialComponent {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
