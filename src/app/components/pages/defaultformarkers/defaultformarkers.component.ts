import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Default } from 'src/app/models/default/default';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-defaultformarkers',
  templateUrl: './defaultformarkers.component.html',
  styleUrls: ['./defaultformarkers.component.css']
})

export class DefaultformarkersComponent {

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalKezelo;
  portalvezeto = PortalVezeto;

  marker: string = '';
  markers: string[] = [];
  case: Case = new Case();
  newIllness: string = '';
  illnesses: string[] = [];
  defaults: Default[] = [];
  default: Default = new Default;
  searchValue: string = '';
  selectedRows: boolean[] = [];

  matchesFilter(row: Default): boolean {
    const searchFields: (keyof Default)[] = ['Sex', 'Age', 'Hospitalized', 'Dead']; // Specify the field names of Default

    return searchFields.some(field => {
      const cellValue = String(row[field]).toLowerCase();
      return cellValue.includes(this.searchValue.toLowerCase());
    });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, private location: Location, public loginService: LoginService) {
    // query all the illnesses formn the database
    this.backendService.getMarkers().subscribe(
      result => {
        if (result.isErr()) {
          alert("Betegségek lekérdezése sikertelen");
          console.error(result.unwrapErr());
          return;
        }
        this.markers = result.unwrap();

        console.log("Sikeresen lekérdezve a betegségek az adatbázisból");
        console.log(this.markers);
      });
  }


  // Function to add marker. If the newly selected marker is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addMarker() {
    if (this.marker === '') {
      alert("Kérem adjon meg egy markert!");
      return;
    }
    if (this.marker === "Egészséges") {
      alert("Egészséges itt nem választható!")
      return;
    }
    if (this.illnesses.filter((valami) => valami === this.marker).length > 0) {
      console.log("Marker already exists")
      this.removeMarker(this.marker);
      return;
    }
    this.illnesses.push(this.marker);
  }

  // Function to remove marker from the case
  public removeMarker(illness: string) {
    this.illnesses = this.illnesses.filter(m => m !== illness);
  }

  // Function to finish data input 
  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }
    console.log(this.case);
    console.log("milyen hosszu", this.defaults.length);
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



  private checkRequiredFields(): boolean {

    if (this.illnesses.length < 2) {
      alert("Minimumm 2 marker szükséges! ")
      return false;
    }
    for (let i = 0; i <= this.defaults.length - 1; i++) {
      console.log("eljut idaig", this.defaults[i], this.defaults[i].Dead)
      if ((this.defaults[i].Dead === undefined)
        || (this.defaults[i].Hospitalized === undefined)
        || (this.defaults[i].Dead === null)
        || (this.defaults[i].Hospitalized === null)

        || (this.defaults[i].Dead < 1 || this.defaults[i].Dead > 100)
        || (this.defaults[i].Hospitalized < 1 || this.defaults[i].Hospitalized > 100)) {
        alert("Minden mező kitöltése kötelező! A mezők értéke 1 -100 között lehet! ")
        return false;
      }
    }
    return true;
  }

}
