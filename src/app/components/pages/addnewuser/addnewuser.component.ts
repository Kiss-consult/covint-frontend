import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { UserWithGroups } from 'src/app/models/user/userwithgroups';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent {

  cegActive: boolean = false;
  intezmenyActive: boolean = false;
  userwithgroups: UserWithGroups = new UserWithGroups;
  user: User = new User;
  site: Site = new Site;
  password2: string = "";

  usergroup: string[] = [];
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portalkezelo = PortalKezelo;
  portalvezeto = PortalVezeto;

  doctorgroup: boolean = false;
  researchergroup: boolean = false;
  portaladmingroup: boolean = false;
  portalmanagergroup: boolean = false;

  toggleContent(contentType: string) {
    if (contentType === 'ceg') {
      this.cegActive = true;
      this.intezmenyActive = false;
      this.user.IsCompany = true;
      console.log("ceget valsztottam", this.user.IsCompany)

    } else if (contentType === 'intezmeny') {
      this.cegActive = false;
      this.intezmenyActive = true;
      this.user.IsCompany = false;
      console.log("intezmenyt vaálasztottam:", this.user.IsCompany)
    }

  }
  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(public loginService: LoginService, private location: Location) {

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

  // admin can create ( add) new user with groups, acceptance is not neccessary
  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }
    this.user.Site = this.site;
    this.userwithgroups.User = this.user;
    this.userwithgroups.Groups = this.usergroup;
    this.loginService.insertNewUserbyAdmin(this.userwithgroups).subscribe(
      result => {
        if (result.isErr()) {
          console.error(result.unwrapErr());
          let mess = result.unwrapErr().error.Error;
          if (mess === "error creating user: 409 Conflict: User exists with same username") {
            alert("Sikertelen regisztráció! \nEzzel a felhasználó névvel már regisztráltak korábban!")
            console.log("már regisztártak ezzel a névvel")
          }
          if (mess === "Phone number must start with +36 or 06") {
            alert("Sikertelen regisztráció! \nA telefonszám formátuma +36.... vagy  06....    ")
            console.log("már regisztártak ezzel a névvel")
          }
          return;
        }
        alert("Sikeresen Új felhasználót regisztrált! ");
        console.log("Successfully inserted into database")
        this.site = new Site();
        this.user = new User();
        this.usergroup = [];
      });
  }


  private checkRequiredFields(): boolean {

    if (this.user.Email === "") {
      alert("Az 'Email' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.Password === "") {
      alert("A 'Jelszó' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.Password !== this.password2) {
      alert("A 'Jelszó ismét ' mezőnek meg kell egyeznie a 'jelszó' mezővel!");
      return false;
    }
    if (this.user.FirstName === "") {
      alert("A 'Keresznév' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.LastName === "") {
      alert("A 'Vezetéknév' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.SealNumber === "") {
      alert("A 'Pecsét száma' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.InstitutionName === "" && this.user.CompanyName === "") {
      alert("Az 'Intézmény neve' vagy  a 'Cég neve' mező kitöltése kötelező!");
      return false;
    }
    if (this.site.City === "") {
      alert("A 'Város' mező kitöltése kötelező!");
      return false;
    }
    if (this.site.PostCode === 0 || this.user.Site.PostCode === null) {
      alert("Az 'Irányítószám' mező kitöltése kötelező!");
      return false;
    }
    if (this.site.HouseNumber === 0 || this.user.Site.HouseNumber === null) {
      alert("A 'Házszám' mező kitöltése kötelező!");
      return false;
    }
    if (this.site.Street === "") {
      alert("Az 'Utca' mező kitöltése kötelező!");
      return false;
    }
    if (this.usergroup.length === 0) {
      alert("Kérem adjon meg jogosultsági csoportot!");
      return false;
    }
    return true;
  }

}
