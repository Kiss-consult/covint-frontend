import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covint';
  flag: boolean = true;
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalAdmin;
  portalvezeto = PortalVezeto;

  constructor(public loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
  changePassword() {

    this.router.navigate(["/changepwd"]);
  }



  /*
    ngOnInit(): void {
      const groups = [PortalAdmin, KutatoOrvos, PortalVezeto];
      if(this.loginService.hasAnyGroup(groups)) {
      this.flag = true;
      console.log("app component", this.flag)
    } else {
      alert('uzenet annak akiNEM orvos');  
      this.flag = false;
      console.log("app component",this.flag)
    }
    }
   
    ngAfterContentChecked(): void {
      this.changeDetector.detectChanges();
    }
     */
}
