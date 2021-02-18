import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserEntity } from "src/user/models/user.entity";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";



@Injectable()
export class UserIsUserGuard implements CanActivate{
    
    constructor(
        @Inject(forwardRef(()=>UserService))
        private userService: UserService
    ){}
    
    canActivate(context:ExecutionContext):boolean|Promise<boolean>|Observable<boolean>{
        const request = context.switchToHttp().getRequest()
        const params = request.params

        const user= new UserEntity()
        user.id= request.user.id

        console.log(params)

        return this.userService.findOne(user.id).pipe(
            map((user:User)=>{
                let hasPermission =false
                if (user.id===Number(params)) {
                    hasPermission =true        
                } 
                return user && hasPermission         
                }
            )
        )
    }

}