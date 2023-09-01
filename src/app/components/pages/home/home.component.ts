import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private backendService: BackendService) {
    this.backendService.hello().subscribe((data) => {
      console.log(data);
    });
  }
}
