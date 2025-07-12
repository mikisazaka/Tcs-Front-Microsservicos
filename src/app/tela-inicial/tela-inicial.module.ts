import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { TelaInicialComponent } from './tela-inicial.component.js';
import { TelaInicialRoutingModule } from './tela-inicial-routing.module';
import { LivroModule } from "app/livro/livro.module";
import { AdicionarLivroModule } from "app/adicionar-livro/adicionar-livro.module";
import { HomePageModule } from "app/home-page/home-page.module";

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TelaInicialRoutingModule,
    LivroModule,
    AdicionarLivroModule,
    HomePageModule
],
  exports: [
    TelaInicialComponent
  ]
})
export class TelaInicialModule {}
