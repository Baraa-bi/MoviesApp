import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  #registrationForm!: FormGroup;
  submitted: boolean = false;
  get registrationForm() {
    return this.#registrationForm;
  }

  constructor(
    private _router: Router,
    private _usersService: UsersDataService,
    private _formBuilder: FormBuilder
  ) {
    this.#registrationForm = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {
  }

  get registerFormControl() {
    return this.#registrationForm.controls;
  }

  onRegister(): void {
    this.submitted = true;
    if (this.#registrationForm.valid) {
      this._usersService.register(this.#registrationForm.value).subscribe({
        next: () => this._router.navigate(['movies']),
      });
    }
  }
}
