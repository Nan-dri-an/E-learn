import { Component, OnInit } from '@angular/core';
import { BlogEntry } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blogs/blog.service';

@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.css']
})
export class AllBlogComponent implements OnInit {

  dataSource :BlogEntry[] =[]
   
  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.blogService.findAll().subscribe((result)=>{ 
      this.dataSource  =  result 
     // console.log(this.dataSource)
     })
  }
  delete(id:any){
     let blogid= Number(id)
   // console.log(blogid)
   this.blogService.delete(blogid)
  }
}



