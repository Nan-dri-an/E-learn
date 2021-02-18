import { Component, OnInit } from '@angular/core';
import { map,tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { /*UserData*/ UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns:string[]=['id','name','email','role','delete']
  dataSource :User[] = [];
  
  constructor(private userService: UsersService) { }
  ngOnInit() {

      this.userService.findAll().subscribe((result)=>{ 
      this.dataSource  =  result
     // console.log(this.dataSource)
     })
     
  }
  delete(id:Number){
    this.userService.delete(id)
  }
}
