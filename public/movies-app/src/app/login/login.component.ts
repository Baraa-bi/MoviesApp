import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export class Credentials {
  #username: String;
  #password: String;

  constructor(username: String, password: String) {
    this.#password = password;
    this.#username = username
  }

  get username() { return this.#username }
  set username(userName) { this.#username = userName }

  get password() { return this.#password }
  set password(password) { this.#password = password }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  @ViewChild('loginForm')
  loginForm!: NgForm;
  submitted: boolean = false;

  user: Credentials = new Credentials("", "");

  constructor(private _usersDataService: UsersDataService, private _router: Router, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loginForm.setValue(this.user)
    }, 0)
  }

  onLogin(): void {
    this.submitted = true;
    console.log(this.loginForm.value);
    if (!this.loginForm.invalid) { 
      this._usersDataService.login(this.loginForm.value).subscribe({
        next: (token: string) => this._login(token)
      })
    }
  }

  _login(token: string): void {
    this._authenticationService.login(token);
    this._router.navigate(['/']);
  }

}
