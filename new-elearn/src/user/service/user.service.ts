import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from,throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Like, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { catchError, map, switchMap } from 'rxjs/operators';
import { paginate,IPaginationOptions, Pagination, } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
    constructor( 
        @InjectRepository(UserEntity)//Decoration miaffirmer anle oe injectRepository le PersonneEnitity
        private readonly userBD:Repository<UserEntity>,
        private authService : AuthService
    ){}

    //Create
    create(user:User):Observable<any>{
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash:string)=>{
                const newUser= new UserEntity()
                newUser.name = user.name
                newUser.email = user.email
                newUser.password = user.password
                newUser.role=user.role
                return from(this.userBD.save(newUser)).pipe(
                    map((user:User)=>{
                        const {password,...result}=user
                        return result 
                    }),
                    catchError(err=> throwError(err))
                )    
            })
        )
    }
    //Read
    findAll():Observable<User[]>{
        return from(this.userBD.find()).pipe(
            map((users)=>{
                users.forEach( function(v) {delete v.password});
                return users
            })
        )
    }  
    //Readone
    findOne(id: number):Observable<User>{
        return from(this.userBD.findOne({id})).pipe(
            map((user:User)=>{
                //const {password,...result}=user
                return user
            })
        )
    }
    //Delete
    deleteOne(id: number): Observable<any>{
        return from(this.userBD.delete(id))
    }

    //Update
    updateOne(id: number, user: User):Observable<any>{
        delete user.email
        delete user.password
        // delete user.role
        return from(this.userBD.update(id,user))
    }  
    //Update role
    updateRole(id:number,user:User): Observable<any>{
        return from (this.userBD.update(id,user))
    }
    //login
    login(user:User): Observable<string>{
        return this.validateUser(user.email,user.password).pipe(
            switchMap((user:User)=>{
                if(user){
                    return this.authService.generateJWT(user).pipe(map((jwt:string) =>jwt))
                }
                else{
                    throw 'Wrong Credentials'        
                }
            })
        )
    }
    //find by mail
    findBymail(email:string): Observable<User>{
        return from (this.userBD.findOne({email}))
    } 
    //validate user
    validateUser(email:string, password:string): Observable<object>{
    return this.findBymail(email).pipe(
        switchMap((user:User) =>this.authService.comparePasswords(password, user.password).pipe(
            map((match:boolean)=>{
                if (match){
                    const {password,...result}= user
                    return result
                }
                else{
                    throw Error
                }
            })
        ))
    )
    } 
    /*
    //readall
    page(options: IPaginationOptions):Observable<Pagination<User>>{
        return from(paginate<User>(this.userBD, options)).pipe(
            map((userspageable:Pagination<User>)=>{
                userspageable.items.forEach(function(v){delete v.password})
            return userspageable
            })
        )
    }*/
}
        
       /* paginateFilterbyNom(name:String){
            return from (this.userBD.findAndCount({
                skip:0,
               // take:Number(options.limit) ||10,
                order:{id:"ASC"},
                select:['id','name','email','role'],
                where:[
                    {name: Like('%'+String(name)+'%')}
                ]
            })).pipe(
                map(([users:User[]])=> {

                }
        }*/
        /*.pipe(
                map(([users,totalUsers])=>{
                    const usersPageable:Pagination<User>={
                        items:users,
                        links:{
                            first:options.route + '?limit='+Number(options.limit),
                            previous:options.route+ '',
                            next:options.route+'?limit='+Number(options.limit)+'&page='+Number(options.page),
                            last:options.route+'?limit='+Number(options.limit)+'&page='+Math.ceil(Number(totalUsers)/Number(options.limit))
                        },
                        meta:{
                            currentPage:Number(options.page),
                            itemCount:users.length,
                            itemsPerPage:Number(options.limit),
                            totalItems: totalUsers,
                            totalPages:Math.ceil(Number(totalUsers)/Number(options.limit))
                        }
                    }
                    return usersPageable
                })
            )*/
       

