
import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Case } from 'src/app/models/case/case';
import { Illness } from 'src/app/models/illness/illness';

import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter/filter';
import { Export } from 'src/app/models/export/export';
import { SavedFilter } from 'src/app/models/savedfilter/savedfilter';
import { GroupGuard } from 'src/app/guards/group.guard';
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from 'src/app/models/group/group';
import { LoginService } from 'src/app/services/login/login.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent {
  constructor( public loginService: LoginService) {
   
    
  }

  noFileMessage: string = `:No file uploaded message:No file uploaded yet.`;
  fileName: string = "";
  public dowloadTemplate() {

    const filename = "template.html";
    this.loginService.downloadEmailTemplate().subscribe((result) => {
      if (result.isErr()) {
        console.error(result.unwrapErr());
        return;
      }
      let response = result.unwrap();
      let data = response[0];
      let dataType = response[1];
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(data, { type: dataType }));
      if (filename)
        downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      if (file.name.endsWith(".html") === false) {
        alert(`:Wrong file format error message:Wrong file format. Please upload a html file.`)
        return;
      }
      console.log(file.name);
      this.fileName = file.name;
      try {
        let result = await this.loginService.uploadFile(file,  this.fileName);
        
        console.log(result)
      }
      catch (error) {
        
        alert(`:file upload error message:Failed to upload file`)
      }
      event.target.value = null;
    }
  }

}
