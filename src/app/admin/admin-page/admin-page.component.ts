import { Component } from '@angular/core';
import { Observable, catchError, EMPTY } from 'rxjs';
import { User } from '../../models/user.model';

import { UserService, Page } from '../../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: false,
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})

export class AdminPageComponent {
  usersPage: Page<User> | undefined;
  public errorMessage: string = '';

  // Injeta o serviço no construtor
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers(); // Carrega a primeira página ao iniciar
  }

  loadUsers(page: number = 0) {
    this.userService.getUsers(page, 10).subscribe({
      next: (data) => {
        this.usersPage = data;
      },
      error: (err) => {
        this.errorMessage = 'Falha ao carregar usuários.';
        console.error(err);
      },
    });
  }

  nextPage(): void {
    if (this.usersPage && this.usersPage.number < this.usersPage.totalPages - 1) {
      this.loadUsers(this.usersPage.number + 1);
    }
  }

  previousPage(): void {
    if (this.usersPage && this.usersPage.number > 0) {
      this.loadUsers(this.usersPage.number - 1);
    }
  }

}