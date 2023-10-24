import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';
@Injectable({
    providedIn: 'root'
})
export class GroupGuard  {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const groups = next.data['groups'] as string[];
        if (this.loginService.hasAnyGroup(groups)) {
            return true;
        } else {
            alert(`You have to be any of ${groups} to access this page!`);
            this.router.navigate(['/home']);
            return false;
        }
    }

}
