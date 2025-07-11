import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; 
  size: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly API_URL = 'http://localhost:8888/user'

  constructor(private http: HttpClient) { }

  getUsers(page: number = 0, size: number = 10): Observable<Page<User>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<User>>(this.API_URL, { params });
  }
}