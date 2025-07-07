import { Component } from '@angular/core';

@Component({
  selector: 'app-livros-populares',
  standalone: false,
  templateUrl: './livros-populares.component.html',
  styleUrl: './livros-populares.component.css'
})
export class LivrosPopularesComponent {

    livrosEmAlta: { titulo: string; imagem: string }[] = [
    { titulo: 'Harry Potter', imagem: 'assets/images/harry-potter.jpg' },
    { titulo: 'O Pequeno Príncipe', imagem: 'assets/images/pequeno-principe.jpg' },
    { titulo: 'O Hobbit', imagem: 'assets/images/hobbit.jpg' },
    { titulo: 'O Diário de Anne Frank', imagem: 'assets/images/anne-frank.webp' },
  ];
}
