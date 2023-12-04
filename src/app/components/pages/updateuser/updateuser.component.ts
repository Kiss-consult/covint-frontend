import { Component } from '@angular/core';

import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup,  ReactiveFormsModule ,Validators } from '@angular/forms';
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
  password2: string = "" ;
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
  constructor(public loginService: LoginService,private fb: FormBuilder,
     private _Activatedroute:ActivatedRoute,private router: Router,private location: Location
  )  {
   // this.user.IsCompany = false;
    //console.log("Iscompany start:", this.user.IsCompany)
    //let userdata = OverrideuserComponent.getuserdataValue();
      const id = this._Activatedroute.snapshot.paramMap.get("userdata.id"); /// majd ide jon a masik componensbol a valtozo
      console.log("lekerdeztem" , id);
 
        

      
      this.loginService.getUserAttributes(id).subscribe(result => {
  
        if (result.isErr()) {
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


   
/* Using snapshot */

/*
  public getSelectedGender() {

    let selectedValue = this.genderForm.controls['gender'].value;

    if (selectedValue) {
      console.log('You have selected ' + selectedValue);
    }
    else {
      console.log("You haven't selected anything.");
    }

  }
*/


  public finish() {
   if (!this.checkRequiredFields()) {
      return;
   }
  const id = this._Activatedroute.snapshot.paramMap.get("userdata.id");

  console.log("before finish is company", this.user.IsCompany)
  console.log("before finish user", this.user)
  console.log("before finish id", id)
    this.user.Site = this.site;
    this.loginService.updateUserAttributes(id,this.user).subscribe(
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

  public change(signal : boolean) {
    // if (!this.checkRequiredFields()) {
     //  return;
   //  }
   console.log("Iscompany from page when was click:", this.user.IsCompany)
     this.user.IsCompany = true;
     console.log("Iscompany now:", this.user.IsCompany)
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
