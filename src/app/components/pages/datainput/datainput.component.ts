import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';
import { Location } from '@angular/common'
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-datainput',
  templateUrl: './datainput.component.html',
  styleUrls: ['./datainput.component.css']
})

export class DatainputComponent {
  case: Case = new Case();
  newIllness: string = '';
  newBno: string = '';
  marker: string = '';
  illnesses: Illness[] = [];
  markers: string[] = [];
  // This is only stored for faster access to the illnesses by BNO code
  illnessesByBno: Map<string, Illness> = new Map();
  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(private backendService: BackendService,private location: Location) {
    // query all the illnesses formn the database
    this.backendService.getMarkers().subscribe(
      result => {
        if (result.isErr()) {
          alert("Betegségek lekérdezése sikertelen");
          console.error(result.unwrapErr());
          return;
        }
        this.markers = result.unwrap();
        //for (let illness of result.unwrap()) {
        // illness.BnoCodes.forEach((bnoCode) => {
        //   this.illnessesByBno.set(bnoCode, illness);
        // });
        // }
        // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
        console.log("Sikeresen lekérdezve a betegségek az adatbázisból");
        console.log(this.markers);
        //this.dataSource.paginator = this.paginator;

      });
  }

  // Function to add marker. If the newly selected marker is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addMarker() {
    if (this.marker === '') {
      alert("Kérem adjon meg minimum egy markert!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);

    if (this.marker === "Egészséges" && this.case.Illnesses.length != 0) {
      alert("Már van betegség hozzáadva, így nem lehet Egészséges!");
      return;
    }  


    if (this.case.Illnesses.filter((valami) => valami === this.marker).length > 0) {
      console.log("Marker already exists")
      alert("Ez a marker már hozzá lett adva!")
      //this.removeMarker(this.marker);
      return;
    }

    if (this.case.Illnesses.filter((valami) => valami === "Egészséges").length > 0) {
      console.log("Marker already exists")
      alert("Egészséges jelentése: csak covidos volt, nincs más betegsége!")
      //this.removeMarker(this.marker);
      return;
    }
    this.case.Illnesses.push(this.marker);
    this.newIllness = '';
  }
  // Function to remove marker from the case
  public removeMarker(illness: string) {
    this.case.Illnesses = this.case.Illnesses.filter(m => m !== illness);
  }

  // Function to add bno. If the newly typed bno is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addBno() {
    if (this.newBno === '') {
      alert("Kérem adjon meg egy BNO kódot!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);

    if (this.case.BnoCodes.filter((valami) => valami === this.newBno).length > 0) {
      console.log("Marker already exists")
      this.removeBno(this.newBno);
      return;
    }
    this.case.BnoCodes.push(this.newBno);
    this.newBno = '';
  }


  // Function to remove bno from the case
  public removeBno(bno: string) {
    this.case.BnoCodes = this.case.BnoCodes.filter(m => m !== bno);
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
      alert("A 'Elhunyt' mező kitöltése kötelező");
      return false;
    }
    if (this.case.Illnesses.length === 0) {
      alert("Minimum 1 betegség ( marker) felvitele kötelező! \n Ha nincs társ-betegség, kérem válassza az Egészséges - markert!");
      return false;
    }
    return true;
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