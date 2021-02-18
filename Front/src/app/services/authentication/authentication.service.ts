import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map, switchMap} from 'rxjs/operators'
import { User } from 'src/app/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

export interface LoginForm{
  email:string
  password:string
};

export const JWT_NAME='blog-token'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,
              private jwtHelper:JwtHelperService) { }

  login(loginForm:LoginForm){

    return this.http.post<any>('/api/user/login', {email:loginForm.email, password:loginForm.password}).pipe(
      map((token)=>{
        localStorage.setItem(JWT_NAME,token.access_token)
        return token
      })
    )
  }
  register(user:User){
    return this.http.post<any>('api/user/',user).pipe(
      map(user=>user)
    )
  }

  IsAuthenticated():boolean{
    const token = localStorage.getItem(JWT_NAME)
    //let user=this.jwtHelper.decodeToken(String(token))
    //console.log(user.user)
    if (token) {
     
      //console.log(JWT_NAME)
      //console.log(token)  
     if(this.jwtHelper.isTokenExpired(String(token))){
      return false
      }
      return true
    }
    return false 
    }
  
  logOut(){ 
    localStorage.removeItem(JWT_NAME)
  }

   getUserId(){
      const token=localStorage.getItem(JWT_NAME)
      let user=this.jwtHelper.decodeToken(String(token))
      return user.user.id
    }

}
