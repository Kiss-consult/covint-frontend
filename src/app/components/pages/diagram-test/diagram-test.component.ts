import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Orvos, PortalKezelo, KutatoOrvos, PortalVezeto} from 'src/app/models/group/group'
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
import { ConfigService } from 'src/app/services/config/config.service';
@Component({
  selector: 'app-diagram-test',
  templateUrl: './diagram-test.component.html',
  styleUrls: ['./diagram-test.component.css']
})
export class DiagramTestComponent {
  activeTab: number = 0;
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalKezelo;
  portalvezeto = PortalVezeto;
  
  constructor(private router: Router,public loginService: LoginService, private configService: ConfigService) { }

  showTab(tabNumber: number) {
    let path = ["diagram"];
    switch (tabNumber) {
      case 1:
        path.push(Orvos);
        break;
      case 2:
        path.push(PortalKezelo);
        break;
      case 3:
        path.push(KutatoOrvos);
        break;
      case 4:
        path.push(PortalVezeto);
        break;
    }
    this.router.navigate(path);
    this.activeTab = tabNumber;
  }

  public getDoctorDashboardUrl(): string {
    return this.configService.config.OpensearchDashboardUrlDoctor;
  }

  public getResearcherDashboardUrl(): string {
    return this.configService.config.OpensearchDashboardUrlResearcher;
  }
}
