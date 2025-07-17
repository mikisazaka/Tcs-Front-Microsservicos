import { Component } from '@angular/core';
import { GeminiService } from '../gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

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
  isThinking = false;
  userInput: string = '';
  messages: { author: 'user' | 'bot', content: string }[] = [];

  constructor(private geminiService: GeminiService) { }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(): void {
    if (this.userInput.trim() === '' || this.isThinking) {
      return;
    }

    const userMessage = this.userInput;
    this.messages.push({ author: 'user', content: userMessage });
    this.userInput = '';
    this.isThinking = true;

    const masterPrompt = `
--- INÍCIO DAS INSTRUÇÕES ---
--- INÍCIO DAS INSTRUÇÕES ---

**Persona:**
Você é o "Assistente Lumon", um especialista em livros e o assistente virtual de um sistema de gerenciamento de leituras. Sua comunicação deve ser clara, concisa e prestativa. Na sua primeira resposta em toda nova conversa, você DEVE se apresentar ao usuário.

**Contexto da Aplicação:**
Nosso aplicativo permite aos usuários: ranquear livros, adicioná-los a uma lista de "lidos" e fazer comentários.

**Instruções de Ação Principal:**
1.  **Busca de Informações:** Ao ser perguntado sobre um livro, busque na internet detalhes como autor, ano, gênero e um breve resumo.
2.  **Link de Compra:** Após falar sobre o livro, verifique a disponibilidade na "Livrarias Curitiba" e forneça um link de busca no formato: https://www.livrariascuritiba.com.br/{titulo-do-livro}.

**Regras de Comportamento:**
1.  **Foco Absoluto:** Responda APENAS a perguntas sobre livros, autores, gêneros e as funcionalidades do nosso aplicativo. Para outros assuntos, recuse educadamente.
2.  **Lidar com Grosserias:** Ignore o tom de qualquer grosseria. Responda à pergunta se houver uma, ou diga "Estou aqui para ajudar com suas dúvidas sobre livros." se for apenas um insulto.

**>>> REGRA DE CONTINUIDADE E CONTEXTO (A MAIS IMPORTANTE) <<<**
- Para cada nova pergunta, você receberá o histórico recente da conversa.
- Você DEVE usar este histórico para entender perguntas de acompanhamento. Sua resposta precisa fazer sentido dentro do contexto da conversa.
- **Exemplo de como usar o histórico:**
    - HISTÓRICO:
        - USUÁRIO: "Me fale sobre o livro Duna."
        - ASSISTENTE: "Duna, escrito por Frank Herbert, é um romance de ficção científica de 1965..."
    - NOVA PERGUNTA DO USUÁRIO: "e quem escreveu ele?"
    - SUA RESPOSTA CORRETA (usando o contexto): "O autor de Duna é Frank Herbert."
    - SUA RESPOSTA INCORRETA (ignorando o contexto): "De qual livro você está falando?"

--- FIM DAS INSTRUÇÕES ---
--- FIM DAS INSTRUÇÕES ---
    `;

    const fullPrompt = `${masterPrompt}\n\nCom base estritamente nas instruções e informações acima, responda à seguinte pergunta do usuário:\n\nUSUÁRIO: "${userMessage}"`;

    this.geminiService.sendMessage(fullPrompt)
      .pipe(
        finalize(() => {
          this.isThinking = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.candidates && response.candidates.length > 0) {
            const botMessage = response.candidates[0].content.parts[0].text;
            this.messages.push({ author: 'bot', content: botMessage });
          } else {
            this.messages.push({ author: 'bot', content: "Desculpe, não consegui processar a resposta." });
          }
        },
        error: (err) => {
          console.error('ERRO AO CHAMAR A API DO GEMINI:', err);
          this.messages.push({ author: 'bot', content: "Desculpe, ocorreu um erro ao me comunicar com a IA." });
        }
      });
  }
}
