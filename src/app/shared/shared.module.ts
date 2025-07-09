import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LivrosPopularesComponent } from './livros-populares/livros-populares.component';
import { FullScreenMessageComponent } from './full-screen-message/full-screen-message.component';

@NgModule({
  declarations: [
    NavbarComponent, 
    LivrosPopularesComponent,
  ],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatSidenavModule,
    FullScreenMessageComponent
  ],
  exports: [
    NavbarComponent, 
    LivrosPopularesComponent, 
    CommonModule, 
    MatButtonModule, 
    MatSidenavModule,
    FullScreenMessageComponent
  ], 
})
export class SharedModule {}