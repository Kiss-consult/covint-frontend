import { Component } from '@angular/core';
import { Default } from 'src/app/models/default/default';
import { NewIllness } from 'src/app/models/newillness/newillness';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-addnewillness',
  templateUrl: './addnewillness.component.html',
  styleUrls: ['./addnewillness.component.css']
})

export class AddnewillnessComponent {
  newIllness: NewIllness = new NewIllness(0, "", [], 0, []);
  default: Default = new Default();
  defaults: Default[] = [];
  newGroupName: string = '';
  newAlternativeName: string = '';
  newIsmarker: number = 0;
  ages: number[] = [];
  selectedRows: boolean[] = [];
  searchValue: string = '';

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalKezelo;
  portalvezeto = PortalVezeto;

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
    this.backendService.hello().subscribe((data) => {
      console.log(data);
    });
  }

  // add alternative name ( names ) to the new illness
  public addAlternativeName() {
    const selectedDefaults: Default[] = [];
    for (let i = 0; i < this.selectedRows.length; i++) {
      if (this.selectedRows[i]) {
        selectedDefaults.push(this.newIllness.Defaults[i]);
      }
    }
    if (this.newAlternativeName === '') {
      alert("Kérem adjon meg egy Alternatív nevet!");
      return;
    }
    if (this.newIllness.AlternativeNames.filter((m) => m === this.newAlternativeName).length > 0) {
      console.log("Marker already exists")
      this.removeAlternativeName(this.newAlternativeName);
      return;
    }
    this.newIllness.AlternativeNames.push(this.newAlternativeName);
    this.newAlternativeName = '';
  }

  // Function to remove alternative name from the case
  public removeAlternativeName(bno: string) {
    this.newIllness.AlternativeNames = this.newIllness.AlternativeNames.filter(m => m !== bno);
  }
  // Function to check the required fields of the case.
  // If any of the required fields are not filled, it alerts the user and returns false.
  private checkRequiredFields(): boolean {
    if (this.newIllness.GroupName === null || this.newIllness.GroupName === "") {
      alert("A 'Betegség' mező kitöltése kötelező");
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

  // add new illnesses to the database
  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }
    console.log("finish", this.defaults)
    this.newIllness.Defaults = this.defaults;
    this.backendService.insertIllness(this.newIllness).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen adatfeltöltés");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres adatfeltöltés");
        console.log("Successfully inserted into database")
        this.newIllness = new NewIllness(0, "", [], 0, []);
      });
  }

  ngOnInit(): void {

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

    console.log("defaults", this.defaults)
  }

}