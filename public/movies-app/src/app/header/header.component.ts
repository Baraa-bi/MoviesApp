import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService) { }

  get isLoggedIn() {
    return this._authenticationService.isLoggedIn
  }

  logout(){
    this._authenticationService.logout();
  }

  ngOnInit(): void {
  }

}
