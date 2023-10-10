import { Component } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';
import { BackendService } from 'src/app/services/backend/backend.service';



@Component({
  selector: 'app-addnewillness',
  templateUrl: './addnewillness.component.html',
  styleUrls: ['./addnewillness.component.css']
})



export class AddnewillnessComponent {
  newIllness: Illness = new Illness();
  newGroupName: string = '';
  newAlternativeName: string  = '';
  newIsmarker: number = 0;
  //illnesses: Illness[] = [];

  // This is only stored for faster access to the illnesses by BNO code
  //illnessesByBno: Map<string, Illness> = new Map();
  constructor(private backendService: BackendService) {
    this.backendService.hello().subscribe((data) => {
      console.log(data);
    });
  }
  


  // Function to add bno. If the newly typed bno is already in the case,
  // it removes it. Otherwise it adds it to the case.
  public addAlternativeName() {
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
    if (!this.checkRequiredFields()) {
      return;
    }
    
    this.backendService.insertIllness(this.newIllness).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen adatfeltöltés");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres adatfeltöltés");
        console.log("Successfully inserted into database")
        this.newIllness = new Illness();
      });
  }





}
