
import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';

import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter/filter';
import { Export } from 'src/app/models/export/export';
import { SavedFilter } from 'src/app/models/savedfilter/savedfilter';
import { GroupGuard } from 'src/app/guards/group.guard';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dictionary',
  standalone: true,
  imports: [],
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent {
  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor( public loginService: LoginService,private location: Location,private router: Router) {
   
    
  }
}
