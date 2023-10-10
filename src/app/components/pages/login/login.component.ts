
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe(result => {
      if (result.isOk()) {
        console.log('Bejelentkezés sikeres');
      } else {
        console.log('Bejelentkezés sikertelen');
      }
    });
  }
}

