
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  groups: string[] = [];
  backendService: any;

  constructor(private loginService: LoginService) {}

  onLogin() {
    const loggedIn = this.loginService.login(this.username, this.password);
    if (loggedIn) {
      
      console.log('Bejelentkezés sikeres');
    } else {
      
      console.log('Bejelentkezés sikertelen');
    }
  }
}

