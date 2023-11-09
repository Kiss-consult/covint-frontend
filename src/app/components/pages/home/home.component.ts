import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { LoginService } from 'src/app/services/login/login.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showAlternateContent: boolean = true;


  constructor(private backendService: BackendService, public loginService: LoginService) {
    this.backendService.hello().subscribe((data) => {
      console.log(data);
    });
    this.loginService.isLoggedIn()
  }

  toggleAlternateContent() {
    // this.showAlternateContent = this.loginService.isLoggedIn();
  }
}
