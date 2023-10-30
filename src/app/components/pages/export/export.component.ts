import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';

import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter/filter';
import { Export } from 'src/app/models/export/export';
import { SavedFilter } from 'src/app/models/savedfilter/savedfilter';
import { GroupGuard } from 'src/app/guards/group.guard';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],

})

export class ExportComponent  {

  markerActive: boolean = false;
  filterActive: boolean = false;
  filter: Filter = new Filter();
  private exports: Export[] = [];

  filtername: string = "";
  savedfilters: SavedFilter[] = [];
  savedfilter: SavedFilter = new SavedFilter();
  currentfilter: SavedFilter = new SavedFilter();


  displayedColumns: string[] = ['sex', 'age', 'markers', 'hospitalized', 'dead', 'count', 'validated', 'source', 'datefrom', 'dateto']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<Export>;
  flag: boolean = false;

  newIllness: string = '';
  marker: string = '';
  illnesses: Illness[] = [];
  markers: string[] = [];
  // This is only stored for faster access to the illnesses by BNO code
  illnessesByBno: Map<string, Illness> = new Map();
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10];
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalAdmin;
  portalvezeto = PortalVezeto;

  toggleContent(contentType: string) {
    if (contentType === 'marker') {
      this.markerActive = true;
      this.filterActive = false;
    } else if (contentType === 'filter') {
      this.markerActive = false;
      this.filterActive = true;
    }

  }
  constructor(private backendService: BackendService, public loginService: LoginService, private router: Router,   private changeDetector: ChangeDetectorRef) {
   
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





ngAfterViewInit() {
  this.dataSource = new MatTableDataSource(this.exports);
  this.dataSource.paginator = this.paginator;
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
/*
ngOnInit(): void {
  const groups = [PortalAdmin, KutatoOrvos, PortalVezeto];
  if(this.loginService.hasAnyGroup(groups)) {
  this.flag = true;
  console.log(this.flag)
} else {
  alert('en uzenetem mert te egy orvos vagy');
  this.flag = false;
  console.log(this.flag)
}
}

ngAfterContentChecked(): void {
  this.changeDetector.detectChanges();
}
*/

   // Function to see the funcuóion is valable or not with your permission
  /* public available() {
  const groups = [PortalAdmin, KutatoOrvos, PortalVezeto];
  if (this.loginService.hasAnyGroup(groups)) {
    return true;
  } else {
    alert(`You have to be any of ${groups} to access this page!`);
    this.router.navigate(['/home']);
    return false;
  }

} */
  



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
      this.updateTable();
    });
}

  private updateTable() {
  this.dataSource.data = this.exports;
}


  public saveFilter() {
  //if (!this.checkRequiredFields()) {
  //  return;
  //}

  this.backendService.filterSave(this.filtername, this.filter).subscribe(
    result => {
      if (result.isErr()) {
        alert("Sikertelen szűrő mentés");
        console.error(result.unwrapErr());
        return;
      }
      alert("Sikeres szűrő mentés");
      console.log("Successfully saved filter")

    });
}

  public export () {
  if (!this.checkRequiredFields()) {
    return;
  }
  const filename = "szurt_adatok_covint.xlsx";
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
  public rates() {

  const filename = "eredmenyek_teljes.xlsx";
  this.backendService.downloadRates().subscribe((result) => {
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

  public getFilters() {
  //if (!this.checkRequiredFields()) {
  //  return;
  //}

  this.backendService.getFilterList().subscribe(
    result => {
      if (result.isErr()) {
        alert("Szűrők lekérdezése sikertelen");
        console.error(result.unwrapErr());
        return;
      }
      alert("Sikeres szűrők lekérdezése");
      this.savedfilters = result.unwrap();
      //for (let illness of result.unwrap()) {
      // illness.BnoCodes.forEach((bnoCode) => {
      //   this.illnessesByBno.set(bnoCode, illness);
      // });
      // }
      // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
      console.log("Sikeresen szűrők lekérdezése az adatbázisból");
      console.log(this.savedfilters);
      //this.dataSource.paginator = this.paginator;

    });
}
  public getFilterNames(sf: SavedFilter): string {
  return sf.FilterName;
}

  public getCurrentFilter(currentfilter: SavedFilter): Filter {

  console.log(currentfilter);
  console.log(this.currentfilter.FilterName);

  this.filter = this.currentfilter.Filter;

  console.log(this.filter);

  return this.filter;
}


  public getMarker() {
  //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
  this.filter.Illnesses.push(this.marker);
}


  // Function to remove marker from the filter
  public removeMarker(illness: string) {
  this.filter.Illnesses = this.filter.Illnesses.filter(m => m !== illness);
}

 





}