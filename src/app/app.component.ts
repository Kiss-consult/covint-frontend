import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { KeycloakService } from 'keycloak-angular';


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
  portaladmin = PortalKezelo;
  portalvezeto = PortalVezeto;
  isMenuOpen = false;

  constructor(public loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
  changePassword() {

    this.router.navigate(["/changepwd"]);
  }
  
  getUserAttributes() {

    this.router.navigate(["/profile"]);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  gotoTelco() {
   
    window.open("https://www.w3schools.com");
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