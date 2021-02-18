import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthenticationService,
    private router: Router
    ) { }
    //! somoene else will assign this a prperty
  loginForm!:FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password:new FormControl(null,[
        Validators.required,
        Validators.minLength(3)])
    })
  }
  onSubmit(){
    if (this.loginForm.invalid){
      return; 
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token =>this.router.navigate(['admin']))
    ).subscribe()
  }

  /*login(){
    this.authService.login('mister11@gmail.com','password1').subscribe(data=> console.log('SUCCESS'));
  }*/

}
