import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private apiKey = 'AIzaSyB-Br575iFb3r0NUGLDyfHb4DnR_DwrHcA';

  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  sendMessage(contents: any[]): Observable<any> {
    
    const body = {
      contents: contents
    };

    return this.http.post(this.apiUrl, body);
  }
}
