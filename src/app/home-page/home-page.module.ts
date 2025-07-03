import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component.js';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)], 
  exports: [HomePageComponent]
})
export class HomePageModule {}