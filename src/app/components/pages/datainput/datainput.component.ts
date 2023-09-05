import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';
import { Marker } from 'src/app/models/marker/marker';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-datainput',
  templateUrl: './datainput.component.html',
  styleUrls: ['./datainput.component.css']
})


export class DatainputComponent {
  case: Case = new Case();
  newBno: string = '';
  illnesses: Illness[] = [];
  illnessesByBno: Map<string, Illness> = new Map();

  constructor(private backendService: BackendService) {
    // query all the illnesses formn the database
    this.backendService.getAllIllnesses().subscribe(
      result => {
        if (result.isErr()) {
          alert("Failed to get illnesses from database");
          console.error(result.unwrapErr());
          return;
        }
        for (let illness of result.unwrap()) {
          illness.BnoCodes.forEach((bnoCode) => {
            this.illnessesByBno.set(bnoCode, illness);
          });
        }
        this.illnesses = result.unwrap();
        console.log("Successfully got illnesses from database")
      });
  }

  // Function to add marker
  addMarker() {
    if (this.newBno === '') {
      alert("Please enter a BNO code");
      return;
    }
    const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    if (this.case.Markers.filter(m => m.BnoCode === newMarker.BnoCode).length > 0) {
      console.log("Marker already exists")
      this.removeMarker(newMarker);
      return;
    }
    this.case.Markers.push(newMarker);
    this.newBno = '';
  }

  private checkRequiredFields(): boolean{
    if (this.case.Sex === null || this.case.Sex === "") {
      alert("Sex is a required field");
      return false;
    }
    if (this.case.Age === null || this.case.Age < 18 || this.case.Age > 88) {
      alert("Age is a required field, and must be between 18 and 88");
      return false;
    }
    if (this.case.Hospitalized === null) {
      alert("Hospitalized is a required field");
      return false;
    }
    if (this.case.Dead === null) {
      alert("Dead is a required field");
      return false;
    }
    return true;
  }

  // Function to remove marker from the case
  removeMarker(marker: Marker) {
    this.case.Markers = this.case.Markers.filter(m => m.BnoCode !== marker.BnoCode);
  }

  // Format date to YYYY-MM-DD
  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const monthPadding = month < 10 ? "0" : "";
    const dayPadding = day < 10 ? "0" : "";
    return `${year}-${monthPadding}${month}-${dayPadding}${day}`;
  }

  // Function to finish data input. It checks the required fields,
  // adds the current date to the case, and inserts the case into the database.
  // It also clears the form for the next case.
  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }
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