import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditarLivroComponent } from './editar-livro.component';
import { EditarLivroRoutingModule } from './editar-livro-routing.module';

@NgModule({
  declarations: [EditarLivroComponent],
  imports: [CommonModule, SharedModule, FormsModule, EditarLivroRoutingModule], 
  exports: [EditarLivroComponent]
})
export class EditarLivroModule {}