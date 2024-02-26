
import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

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
