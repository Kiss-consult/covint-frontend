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
  }

  displayedColumns: string[] = ['Név', 'Orvos', 'Kutató orvos', 'Portál kezelő', 'Portál vezető', 'elfogadva']; // Itt adhatod meg az oszlopok neveit
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
  constructor(public loginService: LoginService, private router: Router) {


    this.loginService.getWaitingUsers().subscribe(
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


  public isDoctor(doctorgroup: boolean) {

    this.doctorgroup = doctorgroup;
    if (this.doctorgroup)
      this.usergroup.push("doctor");
    this.doctorgroup = false;
    console.log(this.usergroup);

  }
  public isResearcher(researchergroup: boolean) {

    this.researchergroup = researchergroup;
    if (this.researchergroup)
      this.usergroup.push("researcher");
    this.researchergroup = false;
    console.log(this.researchergroup);
    console.log(this.usergroup);

  }
  public isPortalAdmin(portaladmingroup: boolean) {

    this.portaladmingroup = portaladmingroup;
    if (this.portaladmingroup)
      this.usergroup.push("portal-admin");
    this.portaladmingroup = false;
    console.log(this.usergroup);

  }
  public isPortalManager(portalmanagergroup: boolean) {

    this.portalmanagergroup = portalmanagergroup;
    if (this.portalmanagergroup)
      this.usergroup.push("portal-manager");
    this.portalmanagergroup = false;
    console.log(this.usergroup);

  }
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
        alert("Sikeresuser elfogadás");
        console.log("Successfully accepted the user ")
        this.usergroup = [];
        // this.reloadCurrentPage();
        this.loginService.getWaitingUsers().subscribe(
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


      });



  }

  public reloadCurrentPage() {
    window.location.reload();
  }
}
