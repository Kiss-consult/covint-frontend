import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
import { UserData } from 'src/app/models/userdata/userdata';

@Component({
  selector: 'app-changepwdbyadmin',
  templateUrl: './changepwdbyadmin.component.html',
  styleUrls: ['./changepwdbyadmin.component.css']
})

export class ChangepwdbyadminComponent {
  username: string = "";
  password: string = "";
  currentpassword: string = "";
  newpassword: string = "";
  confirmation: string = "";
  userdata: UserData = new UserData;
  byAdmin: boolean = false;
  orvos = Orvos;
  kutatoorvos = KutatoOrvos;
  portaladmin = PortalKezelo;
  portalvezeto = PortalVezeto;
  id: any;

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(public loginService: LoginService, private _Activatedroute: ActivatedRoute, private router: Router, private location: Location) {
    const id = this._Activatedroute.snapshot.paramMap.get("userdata.id"); /// majd ide jon a masik componensbol a valtozo
    this.id = id;

  }

  public changePassword(byAdmin: boolean) {
    this.byAdmin = byAdmin;
    if (!this.checkRequiredFields()) {
      return;
    }
    if (this.byAdmin == true) {
      this.currentpassword = "";
    }
    console.log('byAdmin', this.byAdmin);

    this.loginService.changePassword(this.currentpassword, this.newpassword, this.confirmation, this.byAdmin, this.id).subscribe(result => {

      if (result.isOk()) {
        console.log("Jelszócsere sikeres admin változtatott: ", this.id);
        alert('Jelszócsere sikeres');
        this.router.navigate(['/home']);
        this.loginService.isLoggedIn()
      } else {
        console.log('Jelszócsere sikertelen');
        let mess = result.unwrapErr().error.Error;
        if (mess === "error changing password: 400 Bad Request: Could not update user!") {
          alert("Sikertelen jelszócsere! \nA jeszó minimum 8 karakter és tartalmaznia kell:  \nkis és nagy betűt, számot és extra karatert! ")
          console.log("rossz jelszó")
        }
        if (mess === "Current password is wrong") {
          alert("Sikertelen jelszócsere! \nA jelenlegi jelszó hibás!")
          console.log("rossz jelnlegi jelszó ")
        }
      }
    });
  }

  private checkRequiredFields(): boolean {
    if (this.newpassword === "") {
      alert("A 'Jelszó' mező kitöltése kötelező!");
      return false;
    }
    if (this.confirmation !== this.newpassword) {
      alert("A 'Jelszó ismét ' mezőnek meg kell egyeznie a 'jelszó' mezővel!");
      return false;
    }
    return true;
  }
}
