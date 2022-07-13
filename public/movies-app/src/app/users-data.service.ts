import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from './login/login.component';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private _http: HttpClient) { }

  register(user: Credentials): Observable<Credentials> {
    return this._http.post<Credentials>(environment.users_base_url, user);
  }

  login(loginCredentials: Credentials) {
    const url = environment.users_base_url + '/login';
    return this._http.post<string>(url, loginCredentials);
  }
}
