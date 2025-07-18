import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { SharedModule } from './shared/shared.module'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatbotComponent,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected title = 'tcs-front-microsservicos';

  ngOnInit(): void {
    initFlowbite();
  }
}
