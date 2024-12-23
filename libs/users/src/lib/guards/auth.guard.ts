import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { JwTService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwTService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.jwtService.getToken();

    if (token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecoded.isAdmin && !this.tokenExpired(tokenDecoded.exp)) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private tokenExpired(expiration: number) {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
