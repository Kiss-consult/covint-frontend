import { Component } from '@angular/core';
import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup,  ReactiveFormsModule ,Validators } from '@angular/forms';

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
  password2: string = "" ;
   // Declare the form group
   genderForm: FormGroup;
 
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
  constructor(private loginService: LoginService,private fb: FormBuilder) {
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
   // if (!this.checkRequiredFields()) {
    //  return;
  //  }
  console.log("before finish is company", this.user.IsCompany)
  console.log("before finish user", this.user)
    this.user.Site = this.site;
    this.loginService.insertNewUser(this.user).subscribe(
      result => {
        if (result.isErr()) {       
         
          
          console.error(result.unwrapErr());
          console.log (result.unwrapErr());
        
         let mess = result.unwrapErr().error.Error;
         alert("sikertelen regisztráció :" + "  " + mess);
          return;
        }
        alert("Sikeres regisztráció");
        console.log("Successfully inserted into database")
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
}
