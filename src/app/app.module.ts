import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './auth/token.interceptor';
import { ReviewModule } from './review/review.module';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReviewModule,
    ChatbotComponent
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }