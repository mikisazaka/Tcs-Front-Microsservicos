import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBooksComponent } from './select-books.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SelectBooksComponent
  }
];

@NgModule({
  declarations: [SelectBooksComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [SelectBooksComponent]
})
export class SelectBooksModule {}
