import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { TelaInicialComponent } from './tela-inicial.component.js';
import { TelaInicialRoutingModule } from './tela-inicial-routing.module';

@NgModule({
  declarations: [TelaInicialComponent],
  imports: [CommonModule, SharedModule, TelaInicialRoutingModule], 
  exports: [TelaInicialComponent]
})
export class TelaInicialModule {}