import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
  
export class AuthService {
  private readonly API_URL = 'http://localhost:8888';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, userData);
  }

  private getDecodedToken(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    return null;
  }

  public getUserId(): number {
    if (this.isLoggedIn()) {
      const decodedToken = this.getDecodedToken();
      return parseInt(decodedToken.sub);
    } else {
      return -1;
    }
  }

  public getUserName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.name;
  }

  public isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.role === 'ADMIN';
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
}
