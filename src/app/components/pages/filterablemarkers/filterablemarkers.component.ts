import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatTableDataSource } from '@angular/material/table';
import { Illness } from 'src/app/models/illness/illness';
import { BackendService } from 'src/app/services/backend/backend.service';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-filterablemarkers',
  templateUrl: './filterablemarkers.component.html',
  styleUrls: ['./filterablemarkers.component.css']
})
export class FilterablemarkersComponent {

  displayedColumns: string[] = ['groupname', 'ismarker']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<Illness>; 
  marker: string = '';
  illnesses: Illness[] = [];
  illness: Illness = new Illness;
  markers: string[] = [];
  // This is only stored for faster access to the illnesses by BNO code
  illnessesByBno: Map<string, Illness> = new Map();
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10];

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalKezelo;
  portalvezeto = PortalVezeto;

  illnessFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

    constructor(private backendService: BackendService ,public loginService: LoginService,private location: Location) {
      
    this.backendService.getAllIllnesses().subscribe(
      result => {
        if (result.isErr()) {
          alert("Betegségek lekérdezése (Illnesses) sikertelen filteres");
          console.error(result.unwrapErr());
          return;
        }
        this.illnesses = result.unwrap();
        this.dataSource = new MatTableDataSource(this.illnesses);
        this.dataSource.paginator = this.paginator;      
        console.log("Sikeresen lekérdezve a betegségek (Illnesses)az adatbázisból filteres");
        console.log(this.illnesses);       

        this.backendService.getMarkers().subscribe(
          result => {
            if (result.isErr()) {
              alert("Betegségek lekérdezése sikertelen filteres");
              console.error(result.unwrapErr());
              return;
            }
            this.markers = result.unwrap();
            
            console.log("Sikeresen lekérdezve a betegségek az adatbázisból filteres");
            console.log(this.markers);      
            this.setMarker()
          });
      });      
  }
 

  // read the status of illnesses ( marker or not)
  public setMarker() {
    for (let illness of this.illnesses) {
      illness.IsMarker = this.markers.some(y => y === illness.GroupName);
      console.log("lassuk mi van");
      console.log(illness.IsMarker);
    };
  }

 // change the status of illnesses
  public change(illness: Illness) {

    this.illness.GroupName = illness.GroupName;
    this.illness.IsMarker = illness.IsMarker;

    console.log("change")
    console.log(this.illness.GroupName, this.illness.IsMarker)

    this.backendService.changeIllness(this.illness.GroupName, this.illness.IsMarker).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen marker illesztés");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres marker illesztés");
        console.log("Successfully changed marker ")
      });
  }

}

