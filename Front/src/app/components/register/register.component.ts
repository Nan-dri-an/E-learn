import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

class CustomValidators {
  static passwordContainsNumber(control:AbstractControl): ValidationErrors| null{
    const regex =/\d/;
    if(regex.test(control.value)&& control.value !==null){
      return null
    } else{
      return { passwordInvalid: true}
    }
  }
  static passwordsMatch(control:AbstractControl):ValidationErrors| null{
    let password = control.get('password')?.value
    let passwordConfirm = control.get('passwordConfirm')?.value
    if (password!=passwordConfirm){
      return null
    } else {
      return {passwordsNotMatching:true}    
    }
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   

  constructor(
    private authService:AuthenticationService,
    private formBuilder:FormBuilder,
    private router: Router
    ) { }
    //! somoene else will assign this a prperty
  registerForm!:FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      email: new FormControl(null,[
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password:new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        CustomValidators.passwordContainsNumber,
      ]),
      passwordConfirm:[null,[Validators.required,]],

      validators:[CustomValidators.passwordsMatch] 
      })              
  }
  onSubmit(){
    if (this.registerForm.invalid){
      return; 
    }
    console.log(this.registerForm.value)

    this.authService.register(this.registerForm.value).pipe(
      map(user =>this.router.navigate(['login']))
    ).subscribe()
  }

}
