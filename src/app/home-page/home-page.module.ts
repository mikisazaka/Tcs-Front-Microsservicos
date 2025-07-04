import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component.js';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, SharedModule, HomePageRoutingModule], 
  exports: [HomePageComponent]
})
export class HomePageModule {}