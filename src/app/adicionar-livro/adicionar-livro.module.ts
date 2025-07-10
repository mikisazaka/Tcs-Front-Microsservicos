import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdicionarLivroComponent } from './adicionar-livro.component';
import { AdicionarLivroRoutingModule } from './adicionar-livro-routing.module';

@NgModule({
  declarations: [AdicionarLivroComponent],
  imports: [CommonModule, SharedModule, FormsModule, AdicionarLivroRoutingModule], 
  exports: [AdicionarLivroComponent]
})
export class AdicionarLivroModule {}