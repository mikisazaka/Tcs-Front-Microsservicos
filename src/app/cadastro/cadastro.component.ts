import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  public hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER']
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      return; 
    }

    this.authService.register(this.cadastroForm.value).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso!', response);

        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Faça o login.',
          confirmButtonColor: '#a2543d',
          confirmButtonText: 'IR PARA O LOGIN',
        }).then(() => {
          this.router.navigate(['/login']); 
        });
      },
      error: (err) => {
        console.error('Erro no cadastro', err);
        Swal.fire({
          icon: 'error',
          title: 'Ops! Algo deu errado',
          text: 'Não foi possível concluir o cadastro.',
          confirmButtonColor: '#a2543d',
          confirmButtonText: 'OK, ENTENDI',
        });
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }
}
