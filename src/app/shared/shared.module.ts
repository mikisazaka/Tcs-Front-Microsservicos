import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './menubar/menubar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LivrosPopularesComponent } from './livros-populares/livros-populares.component';

@NgModule({
  declarations: [MenubarComponent, NavbarComponent, LivrosPopularesComponent],
  imports: [CommonModule, MatButtonModule, MatSidenavModule],
  exports: [MenubarComponent, NavbarComponent, LivrosPopularesComponent, CommonModule, MatButtonModule, MatSidenavModule], 
})
export class SharedModule {}