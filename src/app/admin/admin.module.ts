import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FullScreenMessageComponent } from 'app/shared/full-screen-message/full-screen-message.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FullScreenMessageComponent
  ],
  exports: [
    MatButtonModule
  ]
})
export class AdminModule { }
