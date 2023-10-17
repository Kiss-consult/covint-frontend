import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Illness } from 'src/app/models/illness/illness';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-filterablemarkers',
  templateUrl: './filterablemarkers.component.html',
  styleUrls: ['./filterablemarkers.component.css']
})
export class FilterablemarkersComponent {



  displayedColumns: string[] = ['groupname', 'ismarker']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<Illness> = new MatTableDataSource<Illness>;

  marker: string = '';
  illnesses: Illness[] = [];
  markers: string[] = [];
  // This is only stored for faster access to the illnesses by BNO code
  illnessesByBno: Map<string, Illness> = new Map();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10];



  constructor(private backendService: BackendService) {

    this.backendService.getAllIllnesses().subscribe(
      result => {
        if (result.isErr()) {
          alert("Betegségek lekérdezése (Illnesses) sikertelen filteres");
          console.error(result.unwrapErr());
          return;
        }
        this.illnesses = result.unwrap();

        // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
        console.log("Sikeresen lekérdezve a betegségek (Illnesses)az adatbázisból filteres");
        console.log(this.illnesses);
        //this.dataSource.paginator = this.paginator;

      });


    this.backendService.getMarkers().subscribe(
      result => {
        if (result.isErr()) {
          alert("Betegségek lekérdezése sikertelen filteres");
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
        console.log("Sikeresen lekérdezve a betegségek az adatbázisból filteres");
        console.log(this.markers);
        //this.dataSource.paginator = this.paginator;

      });



  }

  public setMarker() {


    for (let illness of this.illnesses) {
      illness.IsMarker = this.markers.some(y => y === illness.GroupName);
      console.log("lassuk mi van");
      console.log(illness.IsMarker);

    };
  }


  public change() {


  
  }

}