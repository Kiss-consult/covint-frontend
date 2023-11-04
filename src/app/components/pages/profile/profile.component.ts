import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: User = new User;
  userdata : UserData = new UserData;
  userdatas: UserData [] = [];
  username: string = "";
  password: string = "";
  currentpassword: string = "";
  newpassword: string = "";
  confirmation: string = "";

  constructor(public loginService: LoginService, private router: Router) { 

  
    let id = this.loginService.getUserId();
    console.log("lekerdeztem" , id);

    this.loginService.getUserAttributes(id).subscribe(result => {

      if (result.isErr()) {
        alert("useradatok lekérdezése  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      this.user = result.unwrap();
    });
    

  }

  public getAllusers() {
    
    this.loginService.getAllUsers().subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen userlist");
          console.error(result.unwrapErr());
          return;
        }
        this.userdatas = result.unwrap();
        alert("Sikeres userlist");
        console.log(this.userdatas)
        
      });

  }



  public gotoChangePassword() {
    this.router.navigate(['/changepwd']);

  }
}

