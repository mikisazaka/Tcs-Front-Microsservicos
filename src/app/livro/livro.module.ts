import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroRoutingModule } from './livro-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { MostrarLivroComponent } from './mostrar-livro/mostrar-livro.component';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MostrarLivroComponent,
    ListarLivrosComponent
  ],
  imports: [
    CommonModule,
    LivroRoutingModule,
    SharedModule,
    FormsModule
    ],
  exports: [
    ListarLivrosComponent
  ]
})

export class LivroModule {
  
}
