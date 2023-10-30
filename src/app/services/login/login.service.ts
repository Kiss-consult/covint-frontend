import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/models/token/token';
import jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { Empty } from 'src/app/models/utils/empty';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "";
  token: Token = new Token();

  
  constructor(private httpClient: HttpClient, private config: ConfigService, private router: Router) {
    this.url = this.config.config.AuthUrl;
  }

  public getAccessToken(): string {
    return this.token.access_token;
  }

  public getUsername(): string {
    const decoded = jwt_decode<AccessToken>(this.token.access_token);
    return decoded.preferred_username;
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
