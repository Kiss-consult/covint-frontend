import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, finalize, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Empty } from 'src/app/models/utils/empty';
import { UserWithGroups } from 'src/app/models/user/userwithgroups';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static hasAnyGroup(groups: string[]) {
    throw new Error('Method not implemented.');
  }

  url: string = "";
  token: string = "";
  id: string = "";
  email: string = "";
  uploadProgress: number;
  uploadSub: Subscription;
  username: string = "";
  loggedIn: boolean = false;
  userId: string = "";

// Login call Keycloak login service
  constructor(private httpClient: HttpClient, private config: ConfigService,
    private router: Router, private keycloakService: KeycloakService) {
    this.url = this.config.config.AuthUrl;
    keycloakService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          keycloakService.updateToken(20).then((refreshed) => { });
        }
        if (e.type == KeycloakEventType.OnAuthSuccess) {
          this.getUserData();
        }
      }
    });
    if (keycloakService.isLoggedIn()) {
      this.getUserData();
    } else {
      this.loggedIn = false;
    }
  }

  // return with email tempalate in html format, f : define witch one
  public downloadEmailTemplate(f: number): Observable<Result<[any[], string]>> {
    let options = {
      headers: this.getHeaders(),
      params: this.getParams(f),
      responseType: "blob" as "json"
    };
    return this.httpClient.get<Blob>(this.url + "/templates/download", options).pipe(
      map(response => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let result: [any[], string] = [binaryData, dataType]
        console.log(result);
        return new Ok(result);
      }),
      catchError(error => of(new Err<[any[], string]>(error)))
    );
  }

  //  set email template to default
  public setEmailToDeafult(f: number): Observable<Result<{}>> {
    const url = this.url + "/templates/default";
    return this.httpClient.post(url, "", {
      params: this.getParams(f),
      headers: new HttpHeaders(),
    })
      .pipe(
        map(result => fromJSON<{}>(JSON.stringify(result))),
        catchError(error => of(new Err<{}>(error)))
      );
  }


  public getUsername(): string {
    return this.username;
  }

  public getUserId(): string {
    return this.userId;
  }

  public hasAnyGroup(expectedGroups: string[]): boolean {
    const decoded = jwtDecode<AccessToken>(this.token);
    return decoded.groups.some(group => expectedGroups.includes(group));
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public logout() {
    let home = window.location.toString().replace(this.router.url, '')
    this.keycloakService.logout(home)
    this.keycloakService.clearToken();
    this.token = "";
  }  

  // This function inserts the new user into the Auth.
  public insertNewUser(user_: User,): Observable<Result<{}>> {

    const url = this.url + "/registration";
    return this.httpClient.post<Result<{}>>(url, user_).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

  // This function inserts the new user by admin ( no acceptance ) into the Auth.
  public insertNewUserbyAdmin(userwithgroups: UserWithGroups): Observable<Result<{}>> {
    const url = this.url + "/user/create";

    return this.httpClient.post<Result<{}>>(url, userwithgroups).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

  // This function return all users basic data ( email, id)
  public getAllUsers(): Observable<Result<UserData[]>> {
    const url = this.url + "/user/all";
    return this.httpClient.get<Result<UserData[]>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<UserData[]>(JSON.stringify(result))),
      catchError(error => of(new Err<UserData[]>(error)))
    );

  }
  // This function lists the users who are waiting acceptance.
  public getWaitingUsers(): Observable<Result<UserData[]>> {
    const url = this.url + "/user/waiting";
    return this.httpClient.get<Result<UserData[]>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<UserData[]>(JSON.stringify(result))),
      catchError(error => of(new Err<UserData[]>(error)))
    );

  }
  // This function get the user attributes from  Auth. 
  public getUserAttributes(id_: string | null): Observable<Result<User>> {
    const url = this.url + "/user/attributes/" + id_;
    console.log("kuldtem:", id_)
    return this.httpClient.get<Result<User>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<User>(JSON.stringify(result))),
      catchError(error => of(new Err<User>(error)))
    );
  }
  // This function update user attributes on  Auth.
  public updateUserAttributes(id_: string | null, user: User): Observable<Result<{}>> {
    const url = this.url + "/user/update/" + id_;
    console.log("kuldtem:", id_)
    return this.httpClient.put<Result<{}>>(url, user, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }
  
// change own password 
  public changePassword(currentPassword: string, newPassword: string, confirmation: string, byAdmin: boolean, id: string): Observable<Result<{}>> {
    let userID = "";
    if (byAdmin) {
      userID = id;
    }
    if (!byAdmin) {
      userID = this.getUserId()
    }
    const url = this.url + "/user/changepassword/" + userID;
    let newP = { currentPassword, newPassword, confirmation, byAdmin }
    return this.httpClient.put<Result<{}>>(url, newP, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

// admin change password for someone else
  public acceptUser(userId: string, usergroup: string[]): Observable<Result<{}>> {
    const url = this.url + "/user/approve/" + userId;

    return this.httpClient.post<Result<{}>>(url, usergroup, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    });

  }

  // params to define email template will use
  private getParams(f: number): HttpParams {
    let actiontype = "";
    switch (f) {
      case 0:
        actiontype = "reset-password"
        console.log('actiontype', actiontype);
        break;
      case 1:
        actiontype = "user-approved"
        console.log('actiontype', actiontype);
        break;
      case 2:
        actiontype = "user-waiting"
        console.log('actiontype', actiontype);
        break;
      case 3:
        actiontype = "verify-email"
        console.log('actiontype', actiontype);
        break;
      case 4:
        actiontype = "email-test"
        console.log('actiontype', actiontype);
    }
    return new HttpParams().set('action', actiontype);
  }

  private getUserData() {
    this.loggedIn = true;
    this.keycloakService.getToken().then((token) => {
      this.token = token;
    });
    this.keycloakService.loadUserProfile().then((profile) => {
      this.username = profile.username as string;
      this.userId = profile.id as string;
    });
  }

  public login(): void {

    this.loggedIn = this.keycloakService.isLoggedIn();
    if (this.loggedIn === true) {
      this.getUserData();
      return;
    }
    this.keycloakService.login().then(() => {

      this.loggedIn = this.keycloakService.isLoggedIn();
      if (this.loggedIn === true) {
        this.getUserData();
      }
    });
  }


  uploadFile(file: File, f: number): Observable<Result<Empty>> {
    const url = this.url + "/templates/upload";
    let formData = new FormData();
    formData.append('template', file);
    const upload$ = this.httpClient.post(url, formData, {
      params: this.getParams(f),
      headers: new HttpHeaders(),
    })
      .pipe(
        finalize(() => this.reset())
      ).subscribe();
    return of(new Ok<Empty>(new Empty()));
  }


  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = Subscription.EMPTY;
  }
}


