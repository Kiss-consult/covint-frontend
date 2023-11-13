import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static hasAnyGroup(groups: string[]) {
    throw new Error('Method not implemented.');
  }
  url: string = "";
  token: string = "";
  username: string = "";
  loggedIn: boolean = false;
  userId: string = "";


  constructor(private httpClient: HttpClient, private config: ConfigService,
    private router: Router, private keycloakService: KeycloakService) {
    this.url = this.config.config.AuthUrl;
    try {
      this.keycloakService.isLoggedIn().then((loggedIn) => {
        console.log("loggedIn", loggedIn)
        if (loggedIn) {
          this.keycloakService.loadUserProfile().then((profile) => {
            this.loggedIn = true;
            this.username = profile.username as string;
            this.keycloakService.getToken().then((token) => {
              this.token = token;
            });
            this.userId = profile.id as string;
          });
        }
      });
    }
    catch (e: any) {
      console.log("e", e);
    }
    keycloakService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          keycloakService.updateToken(20).then((refreshed) => { });
        }
      }
    });
  }

  public downloadEmailTemplate(): Observable < Result < [any[], string] >> {
      let options = {
        headers: this.getHeaders(),
        params: this.getParams(),
        responseType: "blob" as "json"
      };
      return this.httpClient.get<Blob>(this.url + "/templates/download", options).pipe(
        map(response => {
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let result: [any[], string] = [binaryData, dataType]
          return new Ok(result);
        }),
        catchError(error => of(new Err<[any[], string]>(error)))
      );
    }

  public getUsername(): string {
    return this.username;
  }

  public getUserId(): string {
    return this.userId;
  }
  public hasAnyGroup(expectedGroups: string[]): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    const decoded = jwt_decode<AccessToken>(this.token);
    return decoded.groups.some(group => expectedGroups.includes(group));
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public logout() {
    this.keycloakService.logout();
    this.keycloakService.clearToken();
    this.token = "";
  }


  // This function inserts the new user into the Auth.
  public insertNewUser(user_: User): Observable<Result<{}>> {
    const url = this.url + "/registration";
    return this.httpClient.post<Result<{}>>(url, user_).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }


  // This function inserts the new user into the Auth.
  public getAllUsers(): Observable<Result<UserData[]>> {
    const url = this.url + "/user/all";
    return this.httpClient.get<Result<UserData[]>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<UserData[]>(JSON.stringify(result))),
      catchError(error => of(new Err<UserData[]>(error)))
    );

  }
  // This function inserts the new user into the Auth.
  public getWaitingUsers(): Observable<Result<UserData[]>> {
    const url = this.url + "/user/waiting";
    return this.httpClient.get<Result<UserData[]>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<UserData[]>(JSON.stringify(result))),
      catchError(error => of(new Err<UserData[]>(error)))
    );

  }
  // This function get  new user attributes from  Auth.
  public getUserAttributes(id_: string): Observable<Result<User>> {
    const url = this.url + "/user/attributes/" + id_;
    console.log("kuldtem:", id_)
    return this.httpClient.get<Result<User>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<User>(JSON.stringify(result))),
      catchError(error => of(new Err<User>(error)))
    );
  }


  public changePassword(currentPassword: string, newPassword: string, confirmation: string, byAdmin: boolean): Observable<Result<{}>> {
    const url = this.url + "/user/changepassword" + this.getUserId();
    let newP = { currentPassword, newPassword, confirmation, byAdmin }
    return this.httpClient.put<Result<{}>>(url, newP, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }
  public acceptUser(userId: string, usergroup: string[]): Observable<Result<{}>> {
    const url = this.url + "/user/approve/" + userId;

    return this.httpClient.post<Result<{}>>(url, usergroup, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  private getParams(): HttpParams {
    return new HttpParams().set('action', 'email-test')

      ;
  }

  public login(): void {
    this.keycloakService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
      if (this.loggedIn === false) {
        this.keycloakService.login().then(() => {
          this.loggedIn = true;
          this.keycloakService.loadUserProfile().then((profile) => {
            this.username = profile.username as string;
            this.userId = profile.id as string;
          });
        });
      }
      this.keycloakService.loadUserProfile().then((profile) => {
        this.username = profile.username as string;
        this.userId = profile.id as string;
      });
    });
  }
}
