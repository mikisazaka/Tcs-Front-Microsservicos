import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { TelaInicialComponent } from './tela-inicial.component.js';

@NgModule({
  declarations: [TelaInicialComponent],
  imports: [CommonModule, SharedModule], 
  exports: [TelaInicialComponent]
})
export class TelaInicialModule {}