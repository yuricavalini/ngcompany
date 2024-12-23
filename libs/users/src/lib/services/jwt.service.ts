import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JwTService {
  private readonly TOKEN = 'jwtToken';

  constructor() {}

  setToken(data: string | { [key: string]: unknown }) {
    const token = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(this.TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
  }
}
