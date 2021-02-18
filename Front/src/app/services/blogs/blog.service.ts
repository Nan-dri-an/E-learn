import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogEntry } from 'src/app/models/blog-entry.interface';
import { JWT_NAME } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { 
    
  }
  
  findAll(){

    return this.http.get<BlogEntry[]>('/api/blogs') 
    }
  
  post(blogEntry:BlogEntry){
   // const headers = { 'Authorization','bearer'+String(localStorage.getItem(JWT_NAME))}
    return this.http.post<BlogEntry>('/api/blogs',blogEntry).pipe(
      map(blogEntry=>blogEntry))

  }
  uploadVideos(formData:FormData):Observable<any>{
    return this.http.post<FormData>('api/blogs/video/upload',formData,{
      reportProgress:true,
      observe:'events'
    })
  }
  delete(id:Number){
    // console.log(id)
     this.http.delete<any>('/api/blogs/'+id).subscribe()
   }


}
