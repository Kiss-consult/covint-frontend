import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DatainputComponent } from './components/pages/datainput/datainput.component';
import { ExportComponent } from './components/pages/export/export.component';
import { DiagramComponent } from './components/pages/diagram/diagram.component';
import { HomeComponent } from './components/pages/home/home.component';
import { UsermanagementComponent } from './components/pages/usermanagement/usermanagement.component';
import { AddnewuserComponent } from './components/pages/addnewuser/addnewuser.component';
import { AcceptnewuserComponent } from './components/pages/acceptnewuser/acceptnewuser.component';
import { ChangepwdComponent } from './components/pages/changepwd/changepwd.component';
import { UsersComponent } from './components/pages/users/users.component';
import { WaitingusersComponent } from './components/pages/waitingusers/waitingusers.component';
import { AddnewillnessComponent } from './components/pages/addnewillness/addnewillness.component';
import { OverwritemasteruploadComponent } from './components/pages/overwritemasterupload/overwritemasterupload.component';
import { FilterablemarkersComponent } from './components/pages/filterablemarkers/filterablemarkers.component';
import { MarkermanagementComponent } from './components/pages/markermanagement/markermanagement.component';
import { AuditlogComponent } from './components/pages/auditlog/auditlog.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { DefaultformarkersComponent } from './components/pages/defaultformarkers/defaultformarkers.component'; 
import { PercentoverwriteComponent } from './components/pages/percentoverwrite/percentoverwrite.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  {path: "login", component: LoginComponent},
  {path: "datainput", component: DatainputComponent},
  {path: "export", component: ExportComponent},
  {path: "diagram", component: DiagramComponent},
  {path: "usermanagement", component: UsermanagementComponent},
  {path: "addnewuser", component: AddnewuserComponent},
  {path: "acceptnewuser", component:AcceptnewuserComponent},
  {path: "changepwd", component:ChangepwdComponent},
  {path: "users", component:UsersComponent},
  {path: "waitingusers", component:WaitingusersComponent},
  {path: "addnewillness", component:AddnewillnessComponent},
  {path: "overwritemasterupload", component:OverwritemasteruploadComponent},
  {path: "filterablemarkers", component:FilterablemarkersComponent},
  {path: "markermanagement", component:MarkermanagementComponent},
  {path: "auditlog", component:AuditlogComponent},
  {path: "registration", component:RegistrationComponent},
  {path: "percentoverwrite", component:PercentoverwriteComponent},
  {path: "defaultformarkers", component:DefaultformarkersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
