import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __param } from 'tslib';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  constructor(private router:Router,private authService:AuthenticationService){}

  navigateTo(value:string){
    this.router.navigate(['../',value])
  }
  logOut(){
    this.authService.logOut()
  }
  
}
