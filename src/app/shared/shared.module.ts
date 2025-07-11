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
    FullScreenMessageComponent
  ],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatSidenavModule
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