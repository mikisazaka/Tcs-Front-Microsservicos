import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: false,
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {

  constructor(private router: Router) { }

  irParaHome() {
    this.router.navigate(['/home-page']);
  }

  irParaLivros() {
    this.router.navigate(['/']);
  }
}
