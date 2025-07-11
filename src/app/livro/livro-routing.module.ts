import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarLivroComponent } from './mostrar-livro/mostrar-livro.component';

const routes: Routes = [
  {
    path: '',
    component: MostrarLivroComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LivroRoutingModule { }
