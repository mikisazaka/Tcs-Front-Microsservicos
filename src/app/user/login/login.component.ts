import { Component, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginInvalido = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Ops! Login inválido',
        text: 'Por favor, preencha os campos corretamente.',
        confirmButtonColor: '#a2543d', // Cor do seu tema para o botão
        confirmButtonText: 'OK, ENTENDI'
      });
      return;
    }

    this.loginInvalido = false;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso!', response);

        localStorage.setItem('authToken', response.token);

        this.router.navigate(['/telaInicial']);
      },
      error: (err) => {
        // ---- ERRO ----
        Swal.fire({
          icon: 'error',
          title: 'Ops! Login inválido',
          text: 'E-mail ou senha incorretos.',
          confirmButtonColor: '#a2543d', // Cor do seu tema para o botão
          confirmButtonText: 'OK, ENTENDI'
        });
        this.loginInvalido = true;
      }
    });
  }

  public hidePassword = true;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  goToRegister() {
    this.router.navigate(['/cadastro']);
  }
}
