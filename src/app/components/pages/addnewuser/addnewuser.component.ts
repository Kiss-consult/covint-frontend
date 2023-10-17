import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent {


  user: User = new User;
  site: Site = new Site;
  password2: string = "" ;
 


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
