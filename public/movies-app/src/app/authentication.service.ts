import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get isLoggedIn() {
    if (this.token?.length) {
      return true;
    }
    return false
  }

  get name() { return this._jwtService.decodeToken(this.token)?.name as string }

  get token() { return localStorage.getItem(environment.token) as string }
  set token(token: string) { localStorage.setItem(environment.token, token) }

  logout() {
    localStorage.clear();
  }

  login(token: string) {
    this.token = token;
  }

  constructor(private _jwtService: JwtHelperService) { }
}
