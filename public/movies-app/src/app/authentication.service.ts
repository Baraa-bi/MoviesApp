import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get isLoggedIn() {
    return this.token?.length
  }

  get name() { return this._jwtService.decodeToken(this.token)?.name as string }

  get token() { return localStorage.getItem(environment.token) as string }
  set token(token: string) { localStorage.setItem(environment.token, token) }

  logout(): void {
    localStorage.clear();
  }

  login(token: string): void {
    this.token = token;
  }

  constructor(private _jwtService: JwtHelperService) { }
}
