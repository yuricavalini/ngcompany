import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { User } from '../models/user';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // apiURLUsers = environment.apiUrl + 'users';
  apiURLUsers = 'api/users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUsersCount(): Observable<{ usersCount: number }> {
    return this.http
      .get<User[]>(this.apiURLUsers)
      .pipe(map((users) => ({ usersCount: users.length })));
  }

  getUser(userId: string) {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User, userId: string) {
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  observeIsCurrentUserAuthenticated() {
    return this.usersFacade.isAuthenticated$;
  }
}
