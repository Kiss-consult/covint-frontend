import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent {
  username: string = "";
  password: string = "";
  currentpassword :  string = "";
  newpassword : string = "";
  confirmation :  string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  public changePassword() {
    
    this.loginService.changePassword(this.currentpassword, this.newpassword, this.confirmation).subscribe(result => {
            
      if (result.isOk()) {
        console.log('Jelszócsere sikeres');
        alert('Jelszócsere sikeres');
        this.router.navigate(['/home']);

        
        this.loginService.isLoggedIn()
      } else {
        console.log('Jelszócsere sikertelen');
        alert('Jelszócsere sikertelen');
      }
    });
  }




  
}
