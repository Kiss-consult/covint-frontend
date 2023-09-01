import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Marker } from 'src/app/models/marker/marker';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-datainput',
  templateUrl: './datainput.component.html',
  styleUrls: ['./datainput.component.css']
})


export class DatainputComponent {
  case: Case = new Case();
  newMarker: string = '';

  constructor(private backendService: BackendService) { }
  
  // Function to add marker
  addMarker() {
    this.case.Markers.push(new Marker("", [this.newMarker]));
    this.newMarker = '';
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const monthPadding = month < 10 ? "0" : "";
    const dayPadding = day < 10 ? "0" : "";
    return `${year}-${monthPadding}${month}-${dayPadding}${day}`;
  }

  public finish() {
    this.case.Date = this.formatDate(new Date());
    console.log(this.case);
    this.backendService.insertValidated(this.case).subscribe(
      result => {
        if (result.isErr()) {
          alert("Failed to insert into database");
          console.error(result.unwrapErr());
          return;
        }
        alert("Successfully inserted into database");
        console.log("Successfully inserted into database")
        //todo clear form
      });
  }
}