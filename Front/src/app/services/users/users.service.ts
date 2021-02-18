import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map,tap, } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
/*
export interface UserData{
  items?:User[],
  meta?:{
    totalItems: number,
        itemCount: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number
  },
  links?: {
    first: string,
    previous:string ,
    next :string,
    last :string
  }
}*/

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  /* findAll(page:number, size:number){
    let params = new HttpParams()
    params= params.append('page',String(page))
    params= params.append('limit',String(size))
    return this.http.get<UserData>('/api/user',{params})
  }*/
    
   findAll(){
    return this.http.get<User[]>('/api/user')
    }

    findOne(id:Number){
    return this.http.get<User>('/api/user/'+id).pipe(map((user:User)=>user))
      }
      
    delete(id:Number){
     // console.log(id)
      this.http.delete<any>('/api/user/'+id).subscribe()
    }

    updateOne(user:User){
      return this.http.put<User>('api/user/'+ user.id ,user).pipe(
        map(user=>user))

    }

}
 