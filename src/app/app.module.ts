import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TelaInicialModule } from './tela-inicial/tela-inicial.module';
import { HomePageModule } from './home-page/home-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TelaInicialModule,
    HomePageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
