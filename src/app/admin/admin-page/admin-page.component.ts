import { Component } from '@angular/core';
import { Observable, catchError, EMPTY } from 'rxjs';
import { User } from '../../models/user.model';

import { UserService, Page } from '../../services/user/user.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
    if (
      this.usersPage &&
      this.usersPage.number < this.usersPage.totalPages - 1
    ) {
      this.loadUsers(this.usersPage.number + 1);
    }
  }

  previousPage(): void {
    if (this.usersPage && this.usersPage.number > 0) {
      this.loadUsers(this.usersPage.number - 1);
    }
  }

  currentPage: number = 0;

  carregarUsuarios(page: number = 0) {
    this.userService.getUsers(page).subscribe((data) => {
      this.usersPage = data;
      this.currentPage = page;
    });
  }

  deletarUser(id: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja prosseguir com a remoção do usuário?',
      showDenyButton: true,
      confirmButtonText: 'SIM',
      denyButtonText: 'NÃO',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removerUsuario(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuário removido com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
            if (this.usersPage && this.usersPage.content) {
              if (this.usersPage.content.length === 1 && this.currentPage > 0) {
                this.carregarUsuarios(this.currentPage - 1);
              } else {
                this.carregarUsuarios(this.currentPage);
              }
            } else {
              this.carregarUsuarios(0);
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao remover o usuário',
            });
          },
        });
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'Remoção cancelada',
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  }
}
