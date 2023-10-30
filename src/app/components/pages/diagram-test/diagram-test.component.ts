import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Orvos, PortalAdmin, KutatoOrvos, PortalVezeto} from 'src/app/models/group/group'
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-diagram-test',
  templateUrl: './diagram-test.component.html',
  styleUrls: ['./diagram-test.component.css']
})
export class DiagramTestComponent {
  activeTab: number = 0;
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalAdmin;
  portalvezeto = PortalVezeto;
  
  constructor(private router: Router,public loginService: LoginService) { }

  showTab(tabNumber: number) {
    let path = ["diagram"];
    switch (tabNumber) {
      case 1:
        path.push(Orvos);
        break;
      case 2:
        path.push(PortalAdmin);
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
}
