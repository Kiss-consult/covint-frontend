import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Default } from 'src/app/models/default/default';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-defaultformarkers',
  templateUrl: './defaultformarkers.component.html',
  styleUrls: ['./defaultformarkers.component.css']
})
export class DefaultformarkersComponent {


  marker: string = ''; 
  markers: string[] = [];
  case: Case = new Case();
  newIllness: string = ''; 
  illnesses :  string[] = [];
  defaults : Default[] = [];
  default : Default = new Default;



  constructor(private backendService: BackendService) {
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
      alert("Kérem adjon meg egy markert!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);

    if (this.illnesses.filter((valami) => valami === this.marker).length > 0) {
      console.log("Marker already exists")
      this.removeMarker(this.marker);
      return;
    }
    this.illnesses.push(this.marker);
    //this.marker = "";
  }
  // Function to remove marker from the case
  public removeMarker(illness: string) {
    this.illnesses = this.illnesses.filter(m => m !== illness);
  }

  // Function to finish data input. It checks the required fields,
  // adds the current date to the case, and inserts the case into the database.
  // It also clears the form for the next case.
  public finish() {
    //if (!this.checkRequiredFields()) {
    //  return;
    //}
   // this.case.Date = this.formatDate(new Date());
   if (this.illnesses.length< 2)
   alert("Minimumm 2 marker szükséges! ")
  else
    console.log(this.case);
    this.backendService.overrideCombination(this.illnesses, this.defaults).subscribe(
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

  ngOnInit(): void {
    // Töltsd fel az "ages" tömböt a kívánt életkorokkal.
    let default_: Default = new Default;
    let defaults_: Default[] = [];

    for (let i = 0; i <= 70; i++) {
      this.default.Age = i + 18;
      this.default.Sex = "Férfi";
      this.defaults.push(this.default);
      this.default = new Default;
    }

    for (let i = 0; i <= 70; i++) {
      this.default.Age = i + 18;
      this.default.Sex = "Nő";
      this.defaults.push(this.default);
      this.default = new Default;
    }

    console.log("mindegy", this.defaults)
  }





}
