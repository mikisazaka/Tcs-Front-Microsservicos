import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MatIconModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatButtonModule, 
    CommonModule, 
    SharedModule, 
    LoginRoutingModule,
    ReactiveFormsModule
  ], 
  exports: [
    LoginComponent
  ]
})
export class LoginModule {}