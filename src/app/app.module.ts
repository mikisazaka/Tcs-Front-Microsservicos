import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './auth/token.interceptor';
import { LivroModule } from './livro/livro.module';
import { ReviewModule } from './review/review.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReviewModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  bootstrap:
  [
    AppComponent
  ]
})
export class AppModule {

}
