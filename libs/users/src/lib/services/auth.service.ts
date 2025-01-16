import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiURLUsers = environment.apiUrl + 'users';
  apiURLUsers = 'api/users';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiURLUsers}/login`, {
      email,
      password
    });
  }

  logout() {
    this.jwtService.removeToken();
    this.router.navigate(['/login']);
  }
}
