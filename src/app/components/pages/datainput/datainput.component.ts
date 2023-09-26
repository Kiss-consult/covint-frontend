import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';

import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-datainput',
  templateUrl: './datainput.component.html',
  styleUrls: ['./datainput.component.css']
})

export class DatainputComponent {
  case: Case = new Case();
  newIllness: string = '';
  illnesses: Illness[] = [];
  // This is only stored for faster access to the illnesses by BNO code
  illnessesByBno: Map<string, Illness> = new Map();

  constructor(private backendService: BackendService) {
    // query all the illnesses formn the database
    this.backendService.getAllIllnesses().subscribe(
      result => {
        if (result.isErr()) {
          alert("Betegségek lekérdezése sikertelen");
          console.error(result.unwrapErr());
          return;
        }
        //for (let illness of result.unwrap()) {
         // illness.BnoCodes.forEach((bnoCode) => {
         //   this.illnessesByBno.set(bnoCode, illness);
          //});
        //}
        this.illnesses = result.unwrap();
        console.log("Successfully got illnesses from database")
      });
  }

  // Function to add marker. If the newly selected marker is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addMarker() {
    if (this.newIllness === '') {
      alert("Kérem adjon meg egy BNO kódot");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);



    
    if (this.case.Illnesses.filter((valami) => valami === this.newIllness).length > 0) {
      console.log("Marker already exists")
      this.removeMarker(this.newIllness);
      return;
    }
    this.case.Illnesses.push(this.newIllness);
    this.newIllness = '';
  }

  // Function to check the required fields of the case.
  // If any of the required fields are not filled, it alerts the user and returns false.
  private checkRequiredFields(): boolean {
    if (this.case.Sex === null || this.case.Sex === "") {
      alert("A 'Nem' mező kitöltése kötelező");
      return false;
    }
    if (this.case.Age === null || this.case.Age < 18 || this.case.Age > 88) {
      alert("A 'Kor' mező kitöltése kötelező, és 18 és 88 között kell lennie");
      return false;
    }
    if (this.case.Hospitalized === null) {
      alert("A 'Kórházba került' mező kitöltése kötelező");
      return false;
    }
    if (this.case.Dead === null) {
      alert("A 'Meghalt' mező kitöltése kötelező");
      return false;
    }
    return true;
  }

  // Function to remove marker from the case
  public removeMarker(illness: string) {
    this.case.Illnesses = this.case.Illnesses.filter(m => m !== illness);
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
          alert("Sikertelen adatfeltöltés");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres adatfeltöltés");
        console.log("Successfully inserted into database")
        this.case = new Case();
      });
  }
}