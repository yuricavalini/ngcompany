import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  isSubmitted = false;
  hasAuthError = false;
  authMessage = 'Email or Password are wrong';

  private unsubs$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.authService
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe({
        next: (user) => {
          this.hasAuthError = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login is successful'
          });
          this.jwtService.setToken(user.token);
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          this.hasAuthError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the server. Please, try again later';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login is not authorized'
          });
        }
      });
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  get loginForm() {
    return this.form.controls;
  }
}
