import { Component } from '@angular/core';

import { Site } from 'src/app/models/user/site';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup,  ReactiveFormsModule ,Validators } from '@angular/forms';
import { UserData } from 'src/app/models/userdata/userdata';
import { ActivatedRoute } from '@angular/router';

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
  constructor(public loginService: LoginService,private fb: FormBuilder, private _Activatedroute:ActivatedRoute
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
   // if (!this.checkRequiredFields()) {
    //  return;
  //  }
  const id = this._Activatedroute.snapshot.paramMap.get("userdata.id");

  console.log("before finish is company", this.user.IsCompany)
  console.log("before finish user", this.user)
  console.log("before finish id", id)
    this.user.Site = this.site;
    this.loginService.updateUserAttributes(id,this.user).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen update");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres update");
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
}
