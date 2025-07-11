import { Component } from '@angular/core';

@Component({
  selector: 'app-mostrar-livro',
  standalone: false,
  templateUrl: './mostrar-livro.component.html',
  styleUrl: './mostrar-livro.component.css'
})
export class MostrarLivroComponent {

  public isLiked: boolean = false;
  public color: string = "#fff";
  public added: boolean = false;

  like() {
    if(!this.isLiked) {
      this.color = "red"
    } else {
      this.color = "#fff"
    }

    this.isLiked = !this.isLiked
  }

  add() {
    this.added = !this.added;
  }

}
