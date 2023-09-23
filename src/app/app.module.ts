import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiagramComponent } from './components/pages/diagram/diagram.component';
import { ExportComponent } from './components/pages/export/export.component';
import { DatainputComponent } from './components/pages/datainput/datainput.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsermanagementComponent } from './components/pages/usermanagement/usermanagement.component';
import { AddnewuserComponent } from './components/pages/addnewuser/addnewuser.component';
import { AcceptnewuserComponent } from './components/pages/acceptnewuser/acceptnewuser.component';
import { ChangepwdComponent } from './components/pages/changepwd/changepwd.component';
import { UsersComponent } from './components/pages/users/users.component';
import { WaitingusersComponent } from './components/pages/waitingusers/waitingusers.component';
import { AddnewmarkerComponent } from './components/pages/addnewmarker/addnewmarker.component';
import { OverwritemasteruploadComponent } from './components/pages/overwritemasterupload/overwritemasterupload.component';
import { FilterablemarkersComponent } from './components/pages/filterablemarkers/filterablemarkers.component';
import { MarkermanagementComponent } from './components/pages/markermanagement/markermanagement.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    ExportComponent,
    DatainputComponent,
    LoginComponent,
    HomeComponent,
    UsermanagementComponent,
    AddnewuserComponent,
    AcceptnewuserComponent,
    ChangepwdComponent,
    UsersComponent,
    WaitingusersComponent,
    AddnewmarkerComponent,
    OverwritemasteruploadComponent,
    FilterablemarkersComponent,
    MarkermanagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,       // A táblázat moduljának importálása
    MatPaginatorModule,  // Az oldalazás moduljának importálása
    MatSortModule, 
    MatFormFieldModule,
    BrowserAnimationsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
