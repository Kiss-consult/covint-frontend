import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { LoginService } from 'src/app/services/login/login.service';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { Location } from '@angular/common'


@Component({
  selector: 'app-acceptnewuser',
  templateUrl: './acceptnewuser.component.html',
  styleUrls: ['./acceptnewuser.component.css']
})
export class AcceptnewuserComponent {

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
 
  displayedColumns: string[] = ['Név', 'Orvos', 'Kutató orvos', 'Portál kezelő', 'Portál vezető', 'elfogadva']; 
  dataSource: MatTableDataSource<UserData>;
  @ViewChild('paginator') paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10];

  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalKezelo;
  portalvezeto = PortalVezeto;


  togglePopupContent(userdata: any) {
    this.expandedUser = this.expandedUser === userdata ? null : userdata;
    this.getUserAttributes(userdata.id);

  }
  goBackToPrevPage(): void {
    this.location.back();
  }

  illnessFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public loginService: LoginService, private router: Router, private location: Location) {


    this.loginService.getWaitingUsers().subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen betöltés: várakozó userek");
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


  public isDoctor(doctorgroup: boolean) {
    this.doctorgroup = doctorgroup;
    if (this.doctorgroup)
      this.usergroup.push(Orvos);
    this.doctorgroup = false;
    console.log(this.usergroup);
  }

  public isResearcher(researchergroup: boolean) {
    this.researchergroup = researchergroup;
    if (this.researchergroup)
      this.usergroup.push(KutatoOrvos);
    this.researchergroup = false;
    console.log(this.researchergroup);
    console.log(this.usergroup);
  }

  public isPortalAdmin(portaladmingroup: boolean) {
    this.portaladmingroup = portaladmingroup;
    if (this.portaladmingroup)
      this.usergroup.push(PortalVezeto);
    this.portaladmingroup = false;
    console.log(this.usergroup);
  }

  public isPortalManager(portalmanagergroup: boolean) {
    this.portalmanagergroup = portalmanagergroup;
    if (this.portalmanagergroup)
      this.usergroup.push(PortalKezelo);
    this.portalmanagergroup = false;
    console.log(this.usergroup);
  }
  
  // accept user and add groups to the user
  public accept(userdata: UserData) {
    console.log("kaptam");
    console.log(userdata);
    this.userdata.email = userdata.email;
    this.userdata.id = userdata.id;
    console.log("kuldenem")
    console.log(this.userdata.email, this.userdata.id)
    this.loginService.acceptUser(this.userdata.id, this.usergroup).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen user elfogadás");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres user elfogadás");
        console.log("Successfully accepted the user ")
        this.usergroup = [];
        // this.reloadCurrentPage();
        this.loginService.getWaitingUsers().subscribe(
          result => {
            if (result.isErr()) {
              alert("Sikertelen betöltés: várakozó userek");
              console.error(result.unwrapErr());
              return;
            }
            this.userdatas = result.unwrap();

            this.dataSource = new MatTableDataSource(this.userdatas);
            this.dataSource.paginator = this.paginator;
            console.log(this.userdatas)
            console.log(this.dataSource.data);
          });
      });
  }

// return with user attributes
  public getUserAttributes(id: string) {
    this.loginService.getUserAttributes(id).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen userlist");
          console.error(result.unwrapErr());
          return;
        }
        this.user = result.unwrap();        
        console.log(this.user)   
      });
  }


  public reloadCurrentPage() {
    window.location.reload();
  }
}
