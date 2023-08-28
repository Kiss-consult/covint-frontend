import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DatainputComponent } from './components/pages/datainput/datainput.component';
import { ExportComponent } from './components/pages/export/export.component';
import { DiagramComponent } from './components/pages/diagram/diagram.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  {path: "login", component: LoginComponent},
  {path: "datainput", component: DatainputComponent},
  {path: "export", component: ExportComponent},
  {path: "diagram", component: DiagramComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
