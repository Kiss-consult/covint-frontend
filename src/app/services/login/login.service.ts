import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/models/token/token';
import jwt_decode from 'jwt-decode';
import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "";
  token: Token = new Token();
  
  constructor(private httpClient: HttpClient, private config: ConfigService, private router: Router) {
    this.url = this.config.config.AuthUrl;
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


  public login(username: string, password: string): Observable<Result<Token>> {
    const url = this.url + "/login";
    const body = { Username: username, Password: password };
    return this.httpClient.post<Token>(url, body).pipe(
      map(result => {
        const token = fromJSON<Token>(JSON.stringify(result));
        this.token = token.unwrap();
        return new Ok<Token>(this.token);
      }),
      catchError(error => of(new Err<Token>(error)))
    );  
  }
}
