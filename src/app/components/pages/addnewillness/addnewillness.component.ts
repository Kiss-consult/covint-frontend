import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Default } from 'src/app/models/default/default';
import { Illness } from 'src/app/models/illness/illness';
import { NewIllness } from 'src/app/models/newillness/newillness';
import { BackendService } from 'src/app/services/backend/backend.service';



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



  // This is only stored for faster access to the illnesses by BNO code
  //illnessesByBno: Map<string, Illness> = new Map();
  constructor(private backendService: BackendService) {
    this.backendService.hello().subscribe((data) => {
      console.log(data);
    });
  }




  public setDefaultSexFemale(d: Default): string {

    this.default.Sex = "Nő";
    return d.Sex;
  }


  public setDefaultSexMale(d: Default): string {

    this.default.Sex = "Férfi";
    return d.Sex;;
  }

  // Function to add bno. If the newly typed bno is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addDefault() {


    if (this.default.Sex === '') {
      alert("Kérem adja meg nemet!");
      return;
    }
    if (this.default.Age === null) {
      alert("Kérem adjon meg kort!");
      return;
    }
    if (this.default.Hospitalized === null) {
      alert("Kérem adjon meg %!");
      return;
    }
    if (this.default.Dead === null) {
      alert("Kérem adjon meg %!");
      return;
    }

    this.newIllness.Defaults.push(this.default);
    this.selectedRows.push(false); // Kezdetben a sor nincs kipipálva
    //this.default = new Default(); // Új Default objektum létrehozása
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);

    //this.newIllness.Defaults.push(this.default);
    this.default = new Default;
    console.log(this.default)
    console.log(this.newIllness.Defaults)
    //this.newAlternativeName = '';
  }

  // Function to add bno. If the newly typed bno is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addAlternativeName() {

    const selectedDefaults: Default[] = [];
    for (let i = 0; i < this.selectedRows.length; i++) {
      if (this.selectedRows[i]) {
        // A sor kipipálva, hozzáadhatjuk a kiválasztott Default objektumokat
        selectedDefaults.push(this.newIllness.Defaults[i]);
      }
    }

    if (this.newAlternativeName === '') {
      alert("Kérem adjon meg egy Alternatív nevet!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);

    if (this.newIllness.AlternativeNames.filter((valami) => valami === this.newAlternativeName).length > 0) {
      console.log("Marker already exists")
      this.removeAlternativeName(this.newAlternativeName);
      return;
    }
    this.newIllness.AlternativeNames.push(this.newAlternativeName);
    this.newAlternativeName = '';
  }

  // Function to check the required fields of the case.
  // If any of the required fields are not filled, it alerts the user and returns false.
  private checkRequiredFields(): boolean {
    if (this.newIllness.GroupName === null || this.newIllness.GroupName === "") {
      alert("A 'Nem' mező kitöltése kötelező");
      return false;
    }

    return true;
  }

  // Function to remove bno from the case
  public removeAlternativeName(bno: string) {
    this.newIllness.AlternativeNames = this.newIllness.AlternativeNames.filter(m => m !== bno);
  }



  public finish() {
    //if (!this.checkRequiredFields()) {
      //return;
   // }
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
    // Töltsd fel az "ages" tömböt a kívánt életkorokkal.
    let default_ :Default = new Default;
    let defaults_ : Default[] = [];
   

/*

    for (let i = 0; i <= 70; i++) {
      default_.Age = i +18;
      default_.Sex = "Férfi";

      console.log("record", "Age", default_)
    
      //this.defaults.forEach(function (value) {
      //  console.log(value);
      //});
      
      defaults_.push(default_);
      console.log("tomb elotte", defaults_)

      default_ = new Default;

      console.log("tomb utana", defaults_)
    }

this.defaults = defaults_;
*/

for (let i = 0; i <= 70; i++) {
  this.default.Age = i +18;
  this.default.Sex = "Férfi";  
  
  this.defaults.push(this.default); 

  this.default = new Default;

  
}
for (let i = 0; i <= 70; i++) {
  this.default.Age = i +18;
  this.default.Sex = "Nő";  
  
  this.defaults.push(this.default); 

  this.default = new Default;

  
}


    console.log("mindegy", this.defaults)
  }
  //public getDeafults() {
    //this.newIllness.AlternativeNames = this.newIllness.AlternativeNames.filter(m => m !== bno);

   
}