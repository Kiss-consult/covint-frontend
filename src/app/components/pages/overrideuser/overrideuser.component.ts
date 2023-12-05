
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { LoginService } from 'src/app/services/login/login.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';
import { Location } from '@angular/common'


@Component({
  selector: 'app-overrideuser',
  templateUrl: './overrideuser.component.html',
  styleUrls: ['./overrideuser.component.css']
})
export class OverrideuserComponent {

  user: User = new User;
  users: User[] = [];
  userdata: UserData = new UserData;
  userdatas: UserData[] = [];
  usergroup: string[] = [];

  doctorgroup: boolean = false;
  researchergroup: boolean = false;
  portaladmingroup: boolean = false;
  portalmanagergroup: boolean = false;
  group: string = "";
  username: string = "";
  password: string = "";
  currentpassword: string = "";
  newpassword: string = "";
  confirmation: string = "";

  expandedUser: any | null = null;

  togglePopupContent(userdata: any) {
    this.expandedUser = this.expandedUser === userdata ? null : userdata;
    this.getUserAttributes(userdata.id);
    
  }
  goBackToPrevPage(): void {
    this.location.back();
  }
  displayedColumns: string[] = ['Név',"Jelszócsere","Adatmódosítás"]; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<UserData>;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10];

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalAdmin;
  portalvezeto = PortalVezeto;


  illnessFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public loginService: LoginService, private router: Router,private _Activatedroute:ActivatedRoute,private location: Location) {


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
        console.log("id", this.userdata.id)
        console.log(this.dataSource.data);



      });

  }
  public getUserAttributes(id : string) {
    this.loginService.getUserAttributes(id).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen userlist");
          console.error(result.unwrapErr());
          return;
        }
        this.user = result.unwrap();
  
       // this.dataSource = new MatTableDataSource(this.userdatas);
        //this.dataSource.paginator = this.paginator;
        console.log(this.user)
        //console.log(this.dataSource.data);
  
      });
  
  }
  public updateUserAttributes(id : string, user: User) {
    this.loginService.updateUserAttributes(id, user).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen update user attributes");
          console.error(result.unwrapErr());
          return;
        }
        
  
       // this.dataSource = new MatTableDataSource(this.userdatas);
        //this.dataSource.paginator = this.paginator;
        console.log(this.user)
        //console.log(this.dataSource.data);
  
      });
  
  }
  

 public  changepass(userdata: UserData){
  this.userdata = userdata;
  console.log("call button1",this.userdata)
  this.router.navigate(['/changepwdbyadmin', userdata.id]);
}


public updateattr(userdata: UserData){
  this.userdata = userdata;
  console.log("call button2",this.userdata)
   
    this.router.navigate(
        ['/updateuser', userdata.id]
    ); 
}
  

}

