import { Component, ViewChild, } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';

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


  displayedColumns: string[] = ['position', 'sex', 'age', 'markers', 'hospitalized', 'dead', 'count', 'validated', 'source']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<Illness> = new MatTableDataSource<Illness>;
  newIllness: string = '';
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
        //for (let illness of result.unwrap()) {
         // illness.BnoCodes.forEach((bnoCode) => {
         //   this.illnessesByBno.set(bnoCode, illness);
         // });
       // }
       // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
        console.log("Sikeresen lekérdezve a betegségek az adatbázisból");
        //this.dataSource.paginator = this.paginator;

      });
  }

  private checkRequiredFields(): boolean {

    if (this.filter.Sex === null || this.filter.Sex === "") {
      alert("A 'Nem' mező kitöltése kötelező");
      return false;
    }
    if (this.filter.AgeFrom === null || this.filter.AgeFrom < 18 || this.filter.AgeFrom > 88) {
      alert("A 'Páciens kora -tól' mező kitöltése kötelező, és 18 és 88 között kell lennie");
      return false;
    }
    if (this.filter.AgeTo === null || this.filter.AgeTo < 18 || this.filter.AgeTo > 88) {
      alert("A 'Páciens kora -ig' mező kitöltése kötelező, és 18 és 88 között kell lennie");
      return false;
    }
    return true;
  }

  public getMarkerNames(e: Export): string {
    return e.Illnesses.map(m => m).join(", ");
  }

  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }

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
    const filename = "exported.xlsx";
    this.backendService.downloadExport(this.filter).subscribe((result) => {
      if (result.isErr()) {
        console.error(result.unwrapErr());
        return;
      }
      let response = result.unwrap();
      let data = response[0];
      let dataType = response[1];
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(data, { type: dataType }));
      if (filename)
        downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }



  public getMarker() {
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    this.filter.Illnesses.push(this.newIllness);
  }


  // Function to remove marker from the filter
  public removeMarker(illness: string) {
    this.filter.Illnesses = this.filter.Illnesses.filter(m => m !== illness);
  }
}
