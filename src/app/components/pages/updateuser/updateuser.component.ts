import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/models/userdata/userdata';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {

  cegActive: boolean = false;
  intezmenyActive: boolean = false;
  userdata: UserData = new UserData;
  user: User = new User;
  site: Site = new Site;
  password2: string = "";
  // Declare the form group
  genderForm: FormGroup;
  sub: any;
  id: string = this.userdata.id || '';

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

  constructor(public loginService: LoginService, private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute, private router: Router, private location: Location
  ) {   
    const id = this._Activatedroute.snapshot.paramMap.get("userdata.id"); /// here we get the variable from another page
    console.log("lekerdeztem", id);
    this.loginService.getUserAttributes(id).subscribe(result => {
      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        else
          alert("useradatok lekérdezése  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      this.user = result.unwrap();
    });
    this.genderForm = this.fb.group({
      'gender': ['', Validators.required]
    });
  }


// finish the update process and send data to the database
  public finish() {
    if (!this.checkRequiredFields()) {
      return;
    }
    const id = this._Activatedroute.snapshot.paramMap.get("userdata.id");
    console.log("before finish is company", this.user.IsCompany)
    console.log("before finish user", this.user)
    console.log("before finish id", id)   
    this.loginService.updateUserAttributes(id, this.user).subscribe(
      result => {
        if (result.isErr()) {
          console.error(result.unwrapErr());
          let mess = result.unwrapErr().error.Error;
          if (mess === "Phone number must start with +36 or 06") {
            alert("Sikertelen adatmódosítás! \nA telefonszám formátuma +36.... vagy  06....    ")
            console.log("rossz telefonszám")
          }
          else
            alert("Sikertelen update");
          return;
        }
        alert("Sikeres update");
        this.router.navigate(['/overrideuser']);
        console.log("Successfully updated  database")
        console.log(this.user)
        this.site = new Site();
        this.user = new User();
      });
  }

  



  private checkRequiredFields(): boolean {

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

    if (this.user.Site.City === "") {
      alert("A 'Város' mező kitöltése kötelező!");
      return false;
    }

    if (this.user.Site.PostCode === 0 || this.user.Site.PostCode === null) {
      alert("Az 'Irányítószám' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.Site.HouseNumber === 0 || this.user.Site.HouseNumber === null) {
      alert("A 'Házszám' mező kitöltése kötelező!");
      return false;
    }
    if (this.user.Site.Street === "") {
      console.log(this.site.Street)
      alert("Az 'Utca' mező kitöltése kötelező!");
      return false;
    }
    return true;
  }

}
