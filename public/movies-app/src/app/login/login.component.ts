import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDataService } from '../users-data.service';

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

  constructor(private _usersDataService: UsersDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loginForm.setValue(this.user)
    }, 0)
  }

  onLogin(): void {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      const loginCredentials = new Credentials(this.loginForm.value.username, this.loginForm.value.password)
      this._usersDataService.login(loginCredentials).subscribe({
        next: (loginResult) => {

        }
      })
    }
  }

}
