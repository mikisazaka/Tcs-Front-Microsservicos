import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

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
      import('./user/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'telaInicial',
    loadChildren: () =>
      import('./tela-inicial/tela-inicial.module').then((m) => m.TelaInicialModule)
  },
  {
    path: 'selectBooks',
    loadChildren: () =>
      import('./select-books/select-books.module').then((m) => m.SelectBooksModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./user/cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'livro/:id',
    loadChildren: () => import('./livro/livro.module').then(m => m.LivroModule)
  },
  {
    path: 'usuario/remover/:id',
    loadChildren: () => import('./livro/livro.module').then(m => m.LivroModule)
  },
  {
    path: 'adicionarLivro',
    loadChildren: () => import('./adicionar-livro/adicionar-livro.module').then(m => m.AdicionarLivroModule)
  },
  {
    path: 'editarLivro/:id',
    loadChildren: () => import('./editar-livro/editar-livro.module').then(m => m.EditarLivroModule)
  },
  {
    path: 'like',
    loadChildren: () => import('./likes/likes.module').then(m => m.LikesModule)
  },
  { 
    path: 'reviews/:id',
    loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) 
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
