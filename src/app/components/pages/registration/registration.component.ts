import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  cegActive: boolean = false;
  intezmenyActive: boolean = false;

  user: User = new User;
  site: Site = new Site;
  password2: string = "" ;
 
  toggleContent(contentType: string) {
    if (contentType === 'ceg') {
      this.cegActive = true;
      this.intezmenyActive = false;
    } else if (contentType === 'intezmeny') {
      this.cegActive = false;
      this.intezmenyActive = true;
    }

    }
  constructor(private loginService: LoginService) {
    
  }


  public finish() {
   // if (!this.checkRequiredFields()) {
    //  return;
  //  }
    this.user.Site = this.site;
    this.loginService.insertNewUser(this.user).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen regisztráció");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres regisztráció");
        console.log("Successfully inserted into database")
        this.site = new Site();
        this.user = new User();
      });
  }
}
