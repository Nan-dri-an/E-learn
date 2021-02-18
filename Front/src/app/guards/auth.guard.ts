import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {  of } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthenticationService, private router:Router){}
  canActivate(): boolean{
    if(!this.auth.IsAuthenticated()){
      this.router.navigate(['login'])
      return false
    }
     //console.log()
      return true  
  }
 
}
