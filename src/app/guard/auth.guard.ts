
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { LoginService } from '../services/login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  
  
  constructor(
    private loginService: LoginService,
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }
  
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {



   return new Promise((resolve, reject) => {
   
    let permission;
      if (!this.authenticated) {
        this.router.navigate(['/']);
        return reject(false);
      }
      console.log(route.data)
      const requiredRoles: string[] = route.data['roles'];
      console.log(requiredRoles)
      if(this.loginService.hasAnyGroup(requiredRoles)) {
        permission = true;
      } else {
       
            permission=false;
        };
      
      if(!permission){
          this.router.navigate(['/']);
      }
      resolve(permission)
    });
  }
}
  
