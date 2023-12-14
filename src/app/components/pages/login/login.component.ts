import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService, private router: Router) {}
/*
  onLogin() {
    this.loginService.login().subscribe(result => {
            
      if (result.isOk()) {
        console.log('Bejelentkezés sikeres');
        this.router.navigate(['/home']);

        
        this.loginService.isLoggedIn()
      } else {
        console.log('Bejelentkezés sikertelen');
      }
    });
  }*/
}
