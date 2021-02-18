import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { BlogService } from "src/blog/blog/blog.service";
import { UserEntity } from "src/user/models/user.entity";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { BlogEntry } from "../model/blog-entry.interface";



@Injectable()
export class UserIsAuthorGuard implements CanActivate{
    
    constructor(
        private userService: UserService,
        private blogService: BlogService
    ){}
    
    canActivate(context:ExecutionContext):boolean|Promise<boolean>|Observable<boolean>{
        const request = context.switchToHttp().getRequest()
        const params = request.params

        const blogEntryId:Number= Number(params.id) 
        const user= new UserEntity()
        user.id = request.user.id
        console.log(user.id)
        console.log(blogEntryId)
       return this.blogService.findOne(blogEntryId).pipe(
           map((blogEntry:BlogEntry)=>{
            {
                let hasPermission =false
                if(user.id===blogEntry.author.id){
                    hasPermission=true
                }
                return user && hasPermission
            }
           })
       )
    }

}