import { NgModule } from '@angular/core';
import { CustomFormCreatorComponent } from './components/pages/custom-form-creator/custom-form-creator.component';
import { RouterModule, Routes } from '@angular/router';
import { DatainputComponent } from './components/pages/datainput/datainput.component';
import { ExportComponent } from './components/pages/export/export.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AddnewuserComponent } from './components/pages/addnewuser/addnewuser.component';
import { AcceptnewuserComponent } from './components/pages/acceptnewuser/acceptnewuser.component';
import { ChangepwdComponent } from './components/pages/changepwd/changepwd.component';
import { AddnewillnessComponent } from './components/pages/addnewillness/addnewillness.component';
import { FilterablemarkersComponent } from './components/pages/filterablemarkers/filterablemarkers.component';
import { AuditlogComponent } from './components/pages/auditlog/auditlog.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from './models/group/group';
import { DefaultformarkersComponent } from './components/pages/defaultformarkers/defaultformarkers.component';
import { PercentoverwriteComponent } from './components/pages/percentoverwrite/percentoverwrite.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { OverrideuserComponent } from './components/pages/overrideuser/overrideuser.component';
import { EmailTemplateComponent } from './components/pages/email-template/email-template.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateuserComponent } from './components/pages/updateuser/updateuser.component';
import { ChangepwdbyadminComponent } from './components/pages/changepwdbyadmin/changepwdbyadmin.component';
import { DictionaryComponent } from './components/pages/dictionary/dictionary.component';
import { DiagramComponent } from './components/pages/diagram/diagram.component';


const routes: Routes = [
  { path: 'form', component: CustomFormCreatorComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "diagram", component: DiagramComponent, data: { roles: [Orvos, PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "datainput", component: DatainputComponent, canActivate: [AuthGuard], data: { roles: [Orvos, PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "export", component: ExportComponent, canActivate: [AuthGuard], data: { roles: [Orvos, PortalKezelo, KutatoOrvos, PortalVezeto] } }, 
  { path: "addnewuser", component: AddnewuserComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "acceptnewuser", component: AcceptnewuserComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "changepwd", component: ChangepwdComponent, canActivate: [AuthGuard], data: { roles: [Orvos, PortalKezelo, KutatoOrvos, PortalVezeto] } }, 
  { path: "addnewillness", component: AddnewillnessComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "filterablemarkers", component: FilterablemarkersComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } }, 
  { path: "auditlog", component: AuditlogComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "registration", component: RegistrationComponent },
  { path: "percentoverwrite", component: PercentoverwriteComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "defaultformarkers", component: DefaultformarkersComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard], data: { roles: [Orvos, PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "overrideuser", component: OverrideuserComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "email-template", component: EmailTemplateComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "dictionary", component: DictionaryComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "updateuser/:userdata.id", component: UpdateuserComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } },
  { path: "changepwdbyadmin/:userdata.id", component: ChangepwdbyadminComponent, canActivate: [AuthGuard], data: { roles: [PortalKezelo, KutatoOrvos, PortalVezeto] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
