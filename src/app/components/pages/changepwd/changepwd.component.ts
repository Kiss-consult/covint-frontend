import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';
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
  byAdmin : boolean = false;
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalAdmin;
  portalvezeto = PortalVezeto;


  constructor(public loginService: LoginService, private router: Router) {}

  public changePassword(byAdmin: boolean) {
    this.byAdmin = byAdmin;
    if (this.byAdmin == true)
    {
      
      this.currentpassword = "";    
      
    } 
  

    console.log('byAdmin', this.byAdmin);

    this.loginService.changePassword(this.currentpassword, this.newpassword, this.confirmation, this.byAdmin).subscribe(result => {
            
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
