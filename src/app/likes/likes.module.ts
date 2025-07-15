import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LikesComponent } from './likes.component';
import { SharedModule } from 'app/shared/shared.module';
import { LikesRoutingModule } from './likes-routing.module';

@NgModule({
  declarations: [LikesComponent],
  imports: [CommonModule, FormsModule, SharedModule, LikesRoutingModule],
  exports: [LikesComponent]
})
export class LikesModule {}
