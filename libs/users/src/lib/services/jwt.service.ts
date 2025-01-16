import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
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

  getUserIdFromToken() {
    const token = this.getToken();
    if (!token) return null;

    const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    if (!tokenDecoded || !tokenDecoded.userId) {
      return null;
    }

    return tokenDecoded.userId;
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) return false;

    const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    return !this.tokenExpired(tokenDecoded.exp);
  }

  private tokenExpired(expiration: number) {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
