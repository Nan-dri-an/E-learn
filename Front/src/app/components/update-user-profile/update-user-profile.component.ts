import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  
  form!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthenticationService,
    private userService:UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:[null,{disabled:true},[Validators.required]],
      name:[null,[Validators.required]],
      email:[{value:null,disabled:true},[Validators.required]]

    })
    let id = this.authService.getUserId()
    this.userService.findOne(id).pipe(
      tap((user:User)=>{
        this.form.patchValue({
          id:user.id,
          name:user.name,
          email:user.email
        })
      })
    ).subscribe()
  }

  update(){
    console.log(this.form.value)
    this.userService.updateOne(this.form.value).pipe(
      tap(()=>this.router.navigate(['users']) )).subscribe()
  }

}
