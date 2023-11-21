import { Component } from '@angular/core';
import { Override } from 'src/app/models/override/override';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-percentoverwrite',
  templateUrl: './percentoverwrite.component.html',
  styleUrls: ['./percentoverwrite.component.css']
})
export class PercentoverwriteComponent {


  override: Override = new Override;
  markers: string[] = [];
  marker: string = '';


  constructor(private backendService: BackendService) {
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


  public overridePercent() {
    //if (!this.checkRequiredFields()) {
    //  return;
    //}

    this.backendService.insertOverride(this.override).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen felülírás");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres felülírás");
        console.log("Successfully ovveride data")
       
      });
  }
  public addMarker() {
    if (this.marker === '') {
      alert("Kérem adjon meg egy markert!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    if (this.override.Illnesses.filter((valami) => valami === this.marker).length > 0) {
      console.log("Marker already exists")
      alert("Ez a marker már hozzá lett adva!")
      //this.removeMarker(this.marker);
      return;
    }
    if (this.marker === "Egészséges" && this.override.Illnesses.length != 0) {
      alert("Már van betegség hozzáadva, így nem lehet Egészséges!");
      return;
    }  


    if (this.override.Illnesses.filter((valami) => valami === "Egészséges").length > 0) {
      console.log("Marker already exists")
      alert("Egészséges jelentése: csak covidos volt, nincs más betegsége!")
      //this.removeMarker(this.marker);
      return;
    }

    
    if (this.override.Illnesses.filter((valami) => valami === this.marker).length > 0) {
      console.log("Marker already exists")
      this.removeMarker(this.marker);
      return;
    }
    this.override.Illnesses.push(this.marker);
    this.marker = "";
   
  }
 // Function to remove marker from the case
 public removeMarker(illness: string) {
  this.override.Illnesses = this.override.Illnesses.filter(m => m !== illness);
}

}
