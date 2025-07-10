import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/telaInicial', pathMatch: 'full' },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'telaInicial',
    loadChildren: () =>
      import('./tela-inicial/tela-inicial.module').then((m) => m.TelaInicialModule)
  },
  {
    path: 'select-books',
    loadChildren: () =>
      import('./select-books/select-books.module').then((m) => m.SelectBooksModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
