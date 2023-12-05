import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
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
  byAdmin : boolean = false;
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalAdmin;
  portalvezeto = PortalVezeto;

  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(public loginService: LoginService, private router: Router,private location: Location) {}

  public changePassword(byAdmin: boolean) {
    this.byAdmin = byAdmin;


    if (!this.checkRequiredFields()) {
      return;
    }

    if (this.byAdmin == true)
    {
      
      this.currentpassword = "";    
      
    } 
  

    console.log('byAdmin', this.byAdmin);

    this.loginService.changePassword(this.currentpassword, this.newpassword, this.confirmation, this.byAdmin, "").subscribe(result => {
            
      if (result.isOk()) {
        console.log('Jelszócsere sikeres');
        alert('Jelszócsere sikeres');
        this.router.navigate(['/home']);

        
        this.loginService.isLoggedIn()
      } else {
        console.log('Jelszócsere sikertelen');
      
        let mess = result.unwrapErr().error.Error;
          
          if (mess === "error changing password: 400 Bad Request: Could not update user!") {
            alert("Sikertelen jelszócsere! \nA jeszó minimum 8 karakter és tartalmaznia kell:  \nkis és nagy betűt, számot és extra karatert! ")
            console.log("rossz jelszó")
          }
      }
    });
  }

  private checkRequiredFields(): boolean {

    
    if (this.newpassword === "") {
      alert("A 'Jelszó' mező kitöltése kötelező!");
      return false;
    }
    if (this.confirmation!== this.newpassword) {
      alert("A 'Jelszó ismét ' mezőnek meg kell egyeznie a 'jelszó' mezővel!");
      return false;
    }
   

    return true;
  }


  
}
