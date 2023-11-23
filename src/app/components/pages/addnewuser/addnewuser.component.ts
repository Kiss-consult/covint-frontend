import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent {

  cegActive: boolean = false;
  intezmenyActive: boolean = false;

  user: User = new User;
  site: Site = new Site;
  password2: string = "" ;
 
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
  constructor(private loginService: LoginService) {
    
  }


  public finish() {
    if (!this.checkRequiredFields()) {
     return;
   }
    this.user.Site = this.site;
    this.loginService.insertNewUser(this.user).subscribe(
      result => {
        if (result.isErr()) {
         
          console.error(result.unwrapErr());

          let mess = result.unwrapErr().error.Error;
          if (mess === "error creating user: 409 Conflict: User exists with same username") {
            alert("Sikertelen regisztráció! \nEzzel a felhasználó névvel már regisztráltak korábban!")
            console.log("már regisztártak ezzel a névvel")
          }
          return;
        }
        alert("Sikeresen Új felhasználót regisztrált!\nA 'Új felhasználó elfogadása' menűpontban a regisztrált felhasználóhoz jogosultságot tud rendelni! ");
        console.log("Successfully inserted into database")
        this.site = new Site();
        this.user = new User();
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

    return true;
  }




}
