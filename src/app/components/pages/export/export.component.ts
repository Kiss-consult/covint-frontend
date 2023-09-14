import { Component, ViewChild, } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';
import { Marker } from 'src/app/models/marker/marker';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],  

})

export class ExportComponent {

  displayedColumns: string[] = ['position', 'bnoCode', 'names']; // Itt adhatod meg az oszlopok neveit
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
      this.dataSource.data = this.illnesses; // Az adatforrás frissítése
      console.log("Sikeresen lekérdezve a betegségek az adatbázisból");
      this.dataSource.paginator = this.paginator;

      });
  }

  private checkRequiredFields(): boolean {
    
    if (this.case.Sex === null || this.case.Sex === "") {
      alert("A 'Nem' mező kitöltése kötelező");
      return false;
    }
    if (this.case.Age === null || this.case.Age < 18 || this.case.Age > 88) {
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
    this.backendService.insertValidated(this.case).subscribe(
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
  }
}
