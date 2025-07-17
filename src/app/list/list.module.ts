import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { SharedModule } from 'app/shared/shared.module';
import { ListRoutingModule } from './list.routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, FormsModule, SharedModule, ListRoutingModule],
  exports: [ListComponent]
})
export class ListModule {}
