import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroRoutingModule } from './livro-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { MostrarLivroComponent } from './mostrar-livro/mostrar-livro.component';


@NgModule({
  declarations: [
    MostrarLivroComponent
  ],
  imports: [
    CommonModule,
    LivroRoutingModule,
    SharedModule
  ]
})

export class LivroModule { }
