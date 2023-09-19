import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Ok, Result } from 'src/app/models/utils/result';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username: string = "";
  password: string = "";
  groups: string[] = [];
  backendService: any;

  constructor() { }

  public getUsername(): string {
    return "";
  }

  public isLoggedIn(): boolean {
    return false;
  }

  public logout() {}


  public login(username: string, password: string): boolean {
    this.username = username;
    this.password = password;
    return true;
        
  }
}
