import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { ConfigService } from './services/config/config.service';

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(public loginService: LoginService, private router: Router, private configService: ConfigService) { }

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

  gotoTelco() {   
    window.open(this.configService.config.TelcoUrl);
  }
  
}