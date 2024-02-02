import { APP_INITIALIZER, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DiagramComponent } from './components/pages/diagram/diagram.component';
import { ExportComponent } from './components/pages/export/export.component';
import { DatainputComponent } from './components/pages/datainput/datainput.component';
import { HomeComponent } from './components/pages/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgSelectModule } from '@ng-select/ng-select';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';


import { MatIconModule } from '@angular/material/icon';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ConfigService } from './services/config/config.service';
import { AuditlogComponent } from './components/pages/auditlog/auditlog.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { DiagramTestComponent } from './components/pages/diagram-test/diagram-test.component';
import { DefaultformarkersComponent } from './components/pages/defaultformarkers/defaultformarkers.component';
import { PercentoverwriteComponent } from './components/pages/percentoverwrite/percentoverwrite.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { OverrideuserComponent } from './components/pages/overrideuser/overrideuser.component';
import { EmailTemplateComponent } from './components/pages/email-template/email-template.component';

import { initCaptcha, initializeApp } from './init/init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { UpdateuserComponent } from './components/pages/updateuser/updateuser.component';
import { ChangepwdbyadminComponent } from './components/pages/changepwdbyadmin/changepwdbyadmin.component';
import { SafePipe } from './pipes/Safepipe';

import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/enviroments/enviroment';


@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    ExportComponent,
    DatainputComponent,
    HomeComponent,
    UsermanagementComponent,
    AddnewuserComponent,
    AcceptnewuserComponent,
    ChangepwdComponent,
    UsersComponent,
    WaitingusersComponent,
    AddnewillnessComponent,
    OverwritemasteruploadComponent,
    FilterablemarkersComponent,
    MarkermanagementComponent,
    AuditlogComponent,
    RegistrationComponent,
    DiagramTestComponent,
    DefaultformarkersComponent,
    PercentoverwriteComponent,
    ProfileComponent,
    OverrideuserComponent,
    EmailTemplateComponent,
    UpdateuserComponent,
    ChangepwdbyadminComponent,
    SafePipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,       // A táblázat moduljának importálása
    MatPaginatorModule,  // Az oldalazás moduljának importálása
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatIconModule,
    KeycloakAngularModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    RecaptchaV3Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initConfig,
    //   deps: [ConfigService],
    //   multi: true
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService, ConfigService],
    // }
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [KeycloakService, ConfigService],
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useFactory: initCaptcha,
      deps: [ConfigService],
    },
    SafePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
