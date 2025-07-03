import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './menubar/menubar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LivrosPopularesComponent } from './livros-populares/livros-populares.component';

const routes: Routes = [
  { path: 'menubar', component: MenubarComponent }
];

@NgModule({
  declarations: [MenubarComponent, NavbarComponent, LivrosPopularesComponent],
  imports: [CommonModule, MatButtonModule, MatSidenavModule, RouterModule.forChild(routes)],
  exports: [MenubarComponent, NavbarComponent, LivrosPopularesComponent, CommonModule, MatButtonModule, MatSidenavModule], 
})
export class SharedModule {}