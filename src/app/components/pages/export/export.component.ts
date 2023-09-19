import { Component, ViewChild, } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';
import { Marker } from 'src/app/models/marker/marker';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter/filter';
import { Export } from 'src/app/models/export/export';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],  

})

export class ExportComponent {

  filter: Filter = new Filter();
  exports: Export[] = [];

  displayedColumns: string[] = ['position', 'sex', 'age', 'markers','hospitalized','dead']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<Illness> = new MatTableDataSource<Illness>;
  case: Case = new Case();
  newBno: string = '';
  illnesses: Illness[] = [];
  // This is only stored for faster access to the illnesses by BNO code
  illnessesByBno: Map<string, Illness> = new Map();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10];


  constructor(private backendService: BackendService) {

    this.backendService.getAllIllnesses().subscribe(
      result => {
      if (result.isErr()) {
        alert("Betegségek lekérdezése sikertelen");
        console.error(result.unwrapErr());
        return;
      }
      this.illnesses = result.unwrap();
      for (let illness of result.unwrap()) {
        illness.BnoCodes.forEach((bnoCode) => {
          this.illnessesByBno.set(bnoCode, illness);
        });
      }
      this.dataSource.data = this.illnesses; // Az adatforrás frissítése
      console.log("Sikeresen lekérdezve a betegségek az adatbázisból");
      this.dataSource.paginator = this.paginator;

      });
  }

  private checkRequiredFields(): boolean {
    
    if (this.filter.Sex === null || this.filter.Sex === "") {
      alert("A 'Nem' mező kitöltése kötelező");
      return false;
    }
    if (this.filter.AgeFrom === null || this.filter.AgeFrom < 18 || this.filter.AgeFrom > 88) {
      alert("A 'Kor' mező kitöltése kötelező, és 18 és 88 között kell lennie");
      return false;
    }
    return true;

    
  }

  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }
    
    console.log(this.case);
    this.backendService.filterExports(this.filter).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen szűrés");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres szűrés");
        console.log("Successfully filtered export data")
        this.exports = result.unwrap();
      });
  }

  public export() {
    if (!this.checkRequiredFields()) {
      return;
    }
    
    console.log(this.case);
    this.backendService.insertValidated(this.case).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen exportálás");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres exportálás");
        console.log("Successfully exported")
        this.case = new Case();
      });
  }


  
  public getMarker() {
    const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    this.filter.Markers.push(newMarker);
  }


  // Function to remove marker from the filter
  public removeMarker(marker: Marker) {
    this.filter.Markers = this.filter.Markers.filter(m => m.BnoCode !== marker.BnoCode);
  }
}
