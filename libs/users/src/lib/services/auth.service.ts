import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiURLUsers = environment.apiUrl + 'users';
  apiURLUsers = 'api/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
  }
}
