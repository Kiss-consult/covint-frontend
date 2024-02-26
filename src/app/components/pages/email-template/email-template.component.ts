
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})

export class EmailTemplateComponent {

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(public loginService: LoginService, private location: Location, private router: Router) {
  }

  noFileMessage: string = `nincs file még feltöltve`;
  uploadedMessage0: string = "";
  uploadedMessage1: string = "";
  uploadedMessage2: string = "";
  uploadedMessage3: string = "";
  uploadedMessage4: string = "";


  fileName0: string = "";
  fileName1: string = "";
  fileName2: string = "";
  fileName3: string = "";
  fileName4: string = "";
  fileName: string = "";

  submit: boolean = false;

  public dowloadTemplate(f: number) {
    let filename = "template.html";
    switch (f) {
      case 0:
        filename = "reset-password-template.html"

        break;
      case 1:
        filename = "user-approved-template.html"

        break;
      case 2:
        filename = "user-waiting-template.html"

        break;
      case 3:
        filename = "verify-email-template.html"

        break;
      case 4:
        filename = "email-test-template.html"
    }
    this.loginService.downloadEmailTemplate(f).subscribe((result) => {
      if (result.isErr()) {
        console.error(result.unwrapErr());
        return;
      }
      let response = result.unwrap();
      let data = response[0];
      let dataType = response[1];
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(data, { type: dataType }));

      window.open(downloadLink.href); // open downloaded file???? 

      if (filename)
        downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  public setEmailToDefault(f: number) {

    this.loginService.setEmailToDeafult(f).subscribe(
      result => {
        if (result.isErr()) {
          alert("email template visszaállítás sikertelen!");
          console.error(result.unwrapErr());
          return;
        }
        alert("email template visszaállítás sikeres!");
      });
  }


  async onFileSelected(event: any, f: number) {
    const file: File = event.target.files[0];
    let F = f;
    console.log("F:", F);

    if (file) {
      if (file.name.endsWith(".html") === false) {
        alert(`:Wrong file format error message:Wrong file format. Please upload a html file.`)
        return;
      }
      console.log(file.name);
      console.log(f);
      switch (f) {
        case 0:
          this.fileName0 = file.name;
          this.uploadedMessage0 = this.fileName0 + "   " + "feltöltve";
          break;
        case 1:
          this.fileName1 = file.name;
          this.uploadedMessage1 = this.fileName1 + "   " + "feltöltve";
          break;
        case 2:
          this.fileName2 = file.name;
          this.uploadedMessage2 = this.fileName2 + "   " + "feltöltve";
          break;
        case 3:
          this.fileName3 = file.name;
          this.uploadedMessage3 = this.fileName3 + "   " + "feltöltve";
          break;
        case 4:
          this.fileName4 = file.name;
          this.uploadedMessage4 = this.fileName4 + "   " + "feltöltve";
      }
      try {
        let result = this.loginService.uploadFile(file, f);
        console.log(result)
      }
      catch (error) {
        alert(`File feltölts sikertelen`)
      }
      event.target.value = null;
    }
  }

  public gotoDictionary() {
    this.router.navigate(["/dictionary"]);
  }

  public setSubmit() {
    this.submit = true;
  }
}




