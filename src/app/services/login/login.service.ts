import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public getUsername(): string {
    return "";
  }

  public isLoggedIn(): boolean {
    return false;
  }

  public logout() {}
}
