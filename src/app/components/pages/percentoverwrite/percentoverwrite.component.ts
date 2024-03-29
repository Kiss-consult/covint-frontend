import { Component } from '@angular/core';
import { Override } from 'src/app/models/override/override';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-percentoverwrite',
  templateUrl: './percentoverwrite.component.html',
  styleUrls: ['./percentoverwrite.component.css']
})
export class PercentoverwriteComponent {

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalKezelo;
  portalvezeto = PortalVezeto;
  override: Override = new Override;
  markers: string[] = [];
  marker: string = '';

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, private location: Location, public loginService: LoginService) {
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

// override selected data 
  public overridePercent() {
    if (!this.checkRequiredFields()) {
      return;
    }
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

// add selected marker or markers
  public addMarker() {
    if (this.marker === '') {
      alert("Kérem adjon meg egy markert!");
      return;
    }
    if (this.override.Illnesses.filter((valami) => valami === this.marker).length > 0) {
      console.log("Marker already exists")
      alert("Ez a marker már hozzá lett adva!")
      return;
    }
    if (this.marker === "Egészséges" && this.override.Illnesses.length != 0) {
      alert("Már van betegség hozzáadva, így nem lehet Egészséges!");
      return;
    }
    if (this.override.Illnesses.filter((valami) => valami === "Egészséges").length > 0) {
      console.log("Marker already exists")
      alert("Egészséges jelentése: csak covidos volt, nincs más betegsége!")
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

  private checkRequiredFields(): boolean {
    if (
      (this.override.Dead < 1 || this.override.Dead > 100)
      || (this.override.Hospitalized < 1 || this.override.Hospitalized > 100)
    ) {
      alert("A mező értéke 1-100 között lehetséges! ")
      return false;
    }
    return true;
  }

}
