import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Auditlog } from 'src/app/models/auditlog/auditlog';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.css']
})
export class AuditlogComponent {

auditlog : Auditlog = new Auditlog;
auditlogs: Auditlog[] = [];


dataSource: MatTableDataSource<Auditlog>; 

@ViewChild('paginator') paginator: MatPaginator;
pageSizeOptions: number[] = [5, 10];

displayedColumns: string[] = ['Dátum','Idő','Szint','Üzenet']; 

illnessFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


  constructor(private backendService: BackendService ) {


      
    this.backendService.getAuditlogs().subscribe(
      result => {
        if (result.isErr()) {
          alert("Auditlog sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
        this.auditlogs = result.unwrap();
        this.dataSource = new MatTableDataSource(this.auditlogs);
        this.dataSource.paginator = this.paginator;
  
       // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
        console.log("Auditlog sikeres betöltés");
        console.log(this.auditlogs);
        

        
          

      });
      
  }







}
