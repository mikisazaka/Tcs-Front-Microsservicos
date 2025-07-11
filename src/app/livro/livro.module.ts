import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroRoutingModule } from './livro-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { MostrarLivroComponent } from './mostrar-livro/mostrar-livro.component';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';


@NgModule({
  declarations: [
    MostrarLivroComponent,
    ListarLivrosComponent
  ],
  imports: [
    CommonModule,
    LivroRoutingModule,
    SharedModule
  ],
  exports: [
    ListarLivrosComponent
  ]
})

export class LivroModule { }
