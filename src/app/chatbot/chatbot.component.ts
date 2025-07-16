import { Component } from '@angular/core';
import { GeminiService } from '../gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    FormsModule
  ]
})
export class ChatbotComponent {
  
  isChatOpen = false;
  userInput: string = '';
  messages: { author: 'user' | 'bot', content: string }[] = [];

  constructor(private geminiService: GeminiService) { }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(): void {
    if (this.userInput.trim() === '') {
      return;
    }

    this.messages.push({ author: 'user', content: this.userInput });
    const userMessage = this.userInput;
    this.userInput = '';

    this.geminiService.sendMessage(userMessage).subscribe(response => {
      const botMessage = response.candidates[0].content.parts[0].text;
      this.messages.push({ author: 'bot', content: botMessage });
    });
  }
}