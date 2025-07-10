import { Component, AfterViewInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-editar-livro',
  standalone: false,
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent implements AfterViewInit {

  selectedGenre: string = "";
  selectedContentRating: string = "";

  constructor() { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  selecionarGenero(generoEscolhido: string) {
    this.selectedGenre = generoEscolhido;
  }

  selecionarClassificacao(classificacao: string) {
    this.selectedContentRating = classificacao;
  }

}
