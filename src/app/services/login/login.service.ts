import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, finalize, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';

import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from 'src/app/models/token/token';

import jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserData } from 'src/app/models/userdata/userdata';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Empty } from 'src/app/models/utils/empty';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static hasAnyGroup(groups: string[]) {
    throw new Error('Method not implemented.');
  }
  url: string = "";

 token_: Token = new Token();
 token: string = "";
  id: string = "";
  email: string = "";
  uploadProgress: number;
  uploadSub: Subscription;

 
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

  public getAccessToken(): string {
    return this.token_.access_token;
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
    const url = this.url + "/user/changepassword/" + this.getUserId();
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

      "Content-Type": "application/json",

      "Authorization": "Bearer " + this.getAccessToken(),
    });

  }
  private getHeadersForUpload(): HttpHeaders {
    return new HttpHeaders({
      "Authorization": "Bearer " + this.getAccessToken(),

      

    });

  }

  private getParams(): HttpParams {
    return new HttpParams().set('action', 'email-test')

      ;
  }
  /*
  public login(username: string, password: string): Observable<Result<Empty>> {

    const url = this.url + "/login";
    const body = { Username: username, Password: password };
    return this.httpClient.post<Token>(url, body).pipe(
      map(result => {
        const token = fromJSON<Token>(JSON.stringify(result));
        this.saveToken(token.unwrap());

        return new Ok<Empty>(new Empty());
      }),
      catchError(error => of(new Err<Empty>(error)))
    );
  }

*/

 

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


  uploadFile(file: File, filename: string): Observable<Result<Empty>> {
    const url = this.url + "/templates/upload";
    let formData = new FormData();
    formData.append('template', file);
    const upload$ = this.httpClient.post(url, formData, {
      params: this.getParams(),
      headers: this.getHeadersForUpload(),
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


