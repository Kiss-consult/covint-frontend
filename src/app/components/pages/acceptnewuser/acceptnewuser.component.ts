import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { LoginService } from 'src/app/services/login/login.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';



@Component({
  selector: 'app-acceptnewuser',
  templateUrl: './acceptnewuser.component.html',
  styleUrls: ['./acceptnewuser.component.css']
})
export class AcceptnewuserComponent {

  user: User = new User;
  userdata : UserData = new UserData;
  userdatas: UserData [] = [];
  username: string = "";
  password: string = "";
  currentpassword: string = "";
  newpassword: string = "";
  confirmation: string = ""; 

  displayedColumns: string[] = ['Név', 'elfogadva']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<UserData>; 
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10];

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin= PortalAdmin;
  portalvezeto = PortalVezeto;


  illnessFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public loginService: LoginService, private router: Router) { 

  
      this.loginService.getAllUsers().subscribe(
        result => {
          if (result.isErr()) {
            alert("Sikertelen userlist");
            console.error(result.unwrapErr());
            return;
          }
          this.userdatas = result.unwrap();         

          this.dataSource = new MatTableDataSource(this.userdatas);
          this.dataSource.paginator = this.paginator;
          console.log(this.userdatas)
          console.log(this.dataSource.data);
          
        });
  
    }

    public accept(userdata: UserData) {

      this.userdata.Email = userdata.Email;
      this.userdata.Id = userdata.Id;
  
      console.log("change")
      console.log(this.userdata.Email, this.userdata.Id)
  /*
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
        */
    }


}
