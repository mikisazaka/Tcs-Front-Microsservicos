import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: '/telaInicial', pathMatch: 'full'
  },
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
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'adicionarLivro',
    loadChildren: () => import('./adicionar-livro/adicionar-livro.module').then(m => m.AdicionarLivroModule)
  },
  {
    path: 'editarLivro',
    loadChildren: () => import('./editar-livro/editar-livro.module').then(m => m.EditarLivroModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
