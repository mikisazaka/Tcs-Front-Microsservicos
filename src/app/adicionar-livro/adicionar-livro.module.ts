import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { AdicionarLivroComponent } from './adicionar-livro.component';
import { AdicionarLivroRoutingModule } from './adicionar-livro-routing.module';

@NgModule({
  declarations: [AdicionarLivroComponent],
  imports: [CommonModule, SharedModule, AdicionarLivroRoutingModule], 
  exports: [AdicionarLivroComponent]
})
export class AdicionarLivroModule {}