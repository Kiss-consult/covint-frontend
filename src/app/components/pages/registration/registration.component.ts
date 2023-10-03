import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = "";
  password: string = "";
  password2: string = "";
  groups: string[] = [];
  backendService: any;

  firstname: string = "";
  lastname : string = "";
  stampnumber : string = "";
  institution : string = "";
  department : string = "";
  company : string = "";
  site : string = "";
  telephone : string = "";
}
