import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LivrosPopularesComponent } from './livros-populares/livros-populares.component';

@NgModule({
  declarations: [NavbarComponent, LivrosPopularesComponent],
  imports: [CommonModule, MatButtonModule, MatSidenavModule],
  exports: [NavbarComponent, LivrosPopularesComponent, CommonModule, MatButtonModule, MatSidenavModule], 
})
export class SharedModule {}