import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  cegActive: boolean = false;
  intezmenyActive: boolean = false;

  user: User = new User;
  site: Site = new Site;
  password2: string = "";
  // Declare the form group
  genderForm: FormGroup;
  reCAPTCHAToken: string = "";
  tokenVisible: boolean = false;
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
      console.log("intezmenyt választottam:", this.user.IsCompany)
    }

  }
  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private location: Location, private recaptchaV3Service: ReCaptchaV3Service) {
    // this.user.IsCompany = false;
    //console.log("Iscompany start:", this.user.IsCompany)
    this.genderForm = this.fb.group({
      'gender': ['', Validators.required]
    });



  }
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

    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {

      this.tokenVisible = true;
      this.reCAPTCHAToken = `Token [${token}] generated`;
      console.log("rechapta ", token)
      console.log("rechapta ", )

      console.log("before finish is company", this.user.IsCompany)
      console.log("before finish user", this.user)
      this.user.Site = this.site;

      this.loginService.insertNewUser(this.user).subscribe(
        result => {
          if (result.isErr()) {
  
  
            console.error(result.unwrapErr());
            console.log(result.unwrapErr());
  
            let mess = result.unwrapErr().error.Error;
            if (mess === "error creating user: 409 Conflict: User exists with same username") {
              alert("Sikertelen regisztráció! \nEzzel a felhasználó névvel már regisztráltak korábban!")
              console.log("már regisztártak ezzel a névvel")
            }
            if (mess === "Phone number must start with +36 or 06") {
              alert("Sikertelen regisztráció! \nA telefonszám formátuma +36.... vagy  06....    ")
              console.log("rossz telefonszám")
            }
            if (mess === "error creating user: 400 Bad Request: Password policy not met") {
              alert("Sikertelen regisztráció! \nA jeszó minimum 8 karakter és tartalmaznia kell:  \nkis és nagy betűt, számot és extra karatert! ")
              console.log("rossz jelszó")
            }
            //"Phone number must start with +36 or 06"
            //alert("sikertelen regisztráció ");
  
            return;
          }
          alert("Sikeres regisztráció!\nRegisztrációját rögzítettük!\nA regisztrációját ellenőrzés után 3 napon belül elfogadjuk,\namiről emailt küldünk.\nTürelmét köszönjük! ");
          console.log("Successfully inserted into database")
          this.router.navigate(['/home']);
          this.site = new Site();
          this.user = new User();
          this.tokenVisible = false;
        });



    }
   );
      

        
  }


  public change(signal: boolean) {
    // if (!this.checkRequiredFields()) {
    //  return;
    //  }
    console.log("Iscompany from page when was click:", this.user.IsCompany)
    this.user.IsCompany = true;
    console.log("Iscompany now:", this.user.IsCompany)
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
