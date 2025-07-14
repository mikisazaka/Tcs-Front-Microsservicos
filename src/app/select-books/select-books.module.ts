import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectBooksComponent } from './select-books.component';
import { SharedModule } from 'app/shared/shared.module';
import { SelectBooksRoutingModule } from './select-books-routing.module';

@NgModule({
  declarations: [SelectBooksComponent],
  imports: [CommonModule, FormsModule, SharedModule, SelectBooksRoutingModule],
  exports: [SelectBooksComponent]
})
export class SelectBooksModule {}
