import { NgModule } from '@angular/core';
import {CustomFormCreatorComponent } from './components/pages/custom-form-creator/custom-form-creator.component';
import { RouterModule, Routes } from '@angular/router';
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
import { KutatoOrvos, Orvos, PortalAdmin, PortalVezeto } from './models/group/group';
import { DefaultformarkersComponent } from './components/pages/defaultformarkers/defaultformarkers.component'; 
import { PercentoverwriteComponent } from './components/pages/percentoverwrite/percentoverwrite.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { OverrideuserComponent } from './components/pages/overrideuser/overrideuser.component';
import { EmailTemplateComponent } from './components/pages/email-template/email-template.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateuserComponent } from './components/pages/updateuser/updateuser.component';


const routes: Routes = [
  { path: 'form', component: CustomFormCreatorComponent },
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },

  { path: "datainput", component: DatainputComponent, canActivate: [AuthGuard] },

  { path: "export", component: ExportComponent, canActivate: [AuthGuard] },
  //canActivate: [GroupGuard], data: { groups: [Orvos, PortalAdmin, KutatoOrvos, PortalVezeto] } },


  { path: "diagram", component: DiagramComponent, children: [
    {path: Orvos, component: DiagramComponent },
    {path: PortalAdmin, component: DiagramComponent },
    {path: KutatoOrvos, component: DiagramComponent },
    {path: PortalVezeto, component: DiagramComponent },
    {path: "", component: DiagramComponent}
  ] },
  { path: "usermanagement", component: UsermanagementComponent },
  { path: "addnewuser", component: AddnewuserComponent },
  { path: "acceptnewuser", component: AcceptnewuserComponent },
  { path: "changepwd", component: ChangepwdComponent },
  { path: "users", component: UsersComponent },
  { path: "waitingusers", component: WaitingusersComponent },
  { path: "addnewillness", component: AddnewillnessComponent },
  { path: "overwritemasterupload", component: OverwritemasteruploadComponent },
  { path: "filterablemarkers", component: FilterablemarkersComponent },
  { path: "markermanagement", component: MarkermanagementComponent },
  { path: "auditlog", component: AuditlogComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "percentoverwrite", component: PercentoverwriteComponent },
  { path: "defaultformarkers", component: DefaultformarkersComponent },
  { path: "profile", component: ProfileComponent },
  { path: "overrideuser", component: OverrideuserComponent },
  { path: "email-template", component: EmailTemplateComponent },
  { path: "updateuser/:userdata.id", component: UpdateuserComponent } // 'product/:id
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
