import { Component, AfterViewInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-adicionar-livro',
  standalone: false,
  templateUrl: './adicionar-livro.component.html',
  styleUrl: './adicionar-livro.component.css'
})
export class AdicionarLivroComponent implements AfterViewInit {

  selectedGenre: string = "";

  constructor() { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  selecionarGenero(generoEscolhido: string) {
    this.selectedGenre = generoEscolhido;
  }
}
