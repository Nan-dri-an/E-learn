import { Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable,of } from 'rxjs';
import { map, switchMap,} from 'rxjs/operators';
import { UserEntity } from 'src/user/models/user.entity';
import { User } from 'src/user/models/user.interface';
import { Repository } from 'typeorm';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { BlogEntry } from '../model/blog-entry.interface';
const slugify = require('slugify')//fair appel a slugify

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntryEntity)
        private readonly blogBD:Repository<BlogEntryEntity>,
    ){}

    create(user:User,blogEntry:BlogEntry):Observable<BlogEntry>{
       blogEntry.author= new UserEntity()
        blogEntry.author.id = user.id
        blogEntry.author.name = user.name
        blogEntry.author.email = user.email
        blogEntry.author.password = user.password
        blogEntry.author.role=user.role
        
        
        //blogEntry.author = user
        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug:string)=>{
                blogEntry.slug=slug
                return from(this.blogBD.save(blogEntry))
            })
        )
    }
    generateSlug(title:string):Observable<string>{
        return of(slugify(title))
    }

    findAll():Observable<BlogEntry[]>{
        return from(this.blogBD.find({relations:['author']}))
    }
    findByUser(userId:Number):Observable<BlogEntry[]>{
        return from(this.blogBD.find({
            where:{author:userId},
            relations:['author']
        })).pipe(map((blogEntries:BlogEntry[])=>blogEntries))

    }

    findOne(id:Number):Observable<BlogEntry>{
        return from(this.blogBD.findOne(Number(id),{relations:['author']}))
    }

    updateOne(id: Number,blogEntry:BlogEntry):Observable<BlogEntry>{
        return from(this.blogBD.update(Number(id),blogEntry)).pipe(
            switchMap(()=>this.findOne(id))
        )
    }

    deleteOne(id:number):Observable<any>{
        return from(this.blogBD.delete(id))
    }

   
}
