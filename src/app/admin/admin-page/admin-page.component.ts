import { Component } from '@angular/core';
import { Observable, catchError, EMPTY } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  imports: [
    CommonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  public users$!: Observable<User[]>;
  public errorMessage: string = '';

  // Injeta o serviço no construtor
  constructor(private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().pipe(
      catchError((error) => {
        console.error('Erro ao buscar usuários:', error);
        this.errorMessage =
          'Você não tem permissão para ver estes dados ou ocorreu um erro no servidor.';
        return EMPTY; 
      })
    );
  }
}