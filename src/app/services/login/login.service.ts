import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/app/models/token/token';
import jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { Empty } from 'src/app/models/utils/empty';
import { UserData } from 'src/app/models/userdata/userdata';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static hasAnyGroup(groups: string[]) {
    throw new Error('Method not implemented.');
  }
  url: string = "";
  token: Token = new Token();
  id: string = "";
  email: string = "";


  constructor(private httpClient: HttpClient, private config: ConfigService, private router: Router) {
    this.url = this.config.config.AuthUrl;
  }

  public getAccessToken(): string {
    return this.token.access_token;
  }

  public getUsername(): string {
    const decoded = jwt_decode<AccessToken>(this.token.access_token);
    console.log(decoded.sub)
    return decoded.preferred_username;
  }

  public getUserId(): string {
    const decoded = jwt_decode<AccessToken>(this.token.access_token);
    console.log(decoded.sub)
    return decoded.sub;
  }
  public hasAnyGroup(expectedGroups: string[]): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    const decoded = jwt_decode<AccessToken>(this.token.access_token);
    return decoded.groups.some(group => expectedGroups.includes(group));
  }

  public isLoggedIn(): boolean {
    return !!this.token.access_token;

  }

  public logout() {
    this.token = new Token();
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

  // This function get  new user attributes from  Auth.
  public getUserAttributes(id_: string): Observable<Result<User>> {
    const url = this.url + "/user/attributes/" + id_;
    console.log("kuldtem:", id_)
    return this.httpClient.get<Result<User>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<User>(JSON.stringify(result))),
      catchError(error => of(new Err<User>(error)))
    );
  }


  public changePassword(currentPassword: string, newPassword: string, confirmation: string): Observable<Result<{}>> {
    const url = this.url + "/user/changepassword";
    let newP = { currentPassword, newPassword, confirmation }
    return this.httpClient.put<Result<{}>>(url, newP, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.getAccessToken()
    });
  }
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

  public refresh(): Observable<Result<Empty>> {
    const url = this.url + "/refresh";
    const body = { RefreshToken: this.token.refresh_token };
    return this.httpClient.post<Token>(url, body).pipe(
      map(result => {
        const token = fromJSON<Token>(JSON.stringify(result));
        this.saveToken(token.unwrap());
        return new Ok<Empty>(new Empty());
      }),
      catchError(error => of(new Err<Empty>(error)))
    );
  }

  private saveToken(token: Token) {
    this.token = token;
    const expire = this.token.expires_in * 1000;
    setTimeout(() => this.refresh().subscribe(), expire - 10000);
  }
}
