import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.Guard';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly Service:UserService){}


//Create
    @Post()
    create(@Body() user:User):Observable<any>{
        return this.Service.create(user).pipe(
            map((user:User)=>user),
            catchError(err=> throwError({error: err.message}))
        )
    }
//login
    @Post('login')
    login(@Body() user:User):Observable<object>{
        return this.Service.login(user).pipe(
           map((jwt:string)=>{
               return {access_token:jwt}
           }),
           catchError(err=> throwError({error: err.message}))
        )
    }  
//Read    
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Observable<User[]>{
        return this.Service.findAll()
    }  
//ReadOne
    @UseGuards(JwtAuthGuard,RolesGuards)
    @Get(':id')
    findOne(@Param()param): Observable<User>{
        return this.Service.findOne(param.id)
    }
 //Delete
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuards)
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<any>{
        return this.Service.deleteOne(Number(id))
    }
//Update  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateOne(@Param('id')id : string, @Body()user: User): Observable<any>{
        return this.Service.updateOne(Number(id),user)
    }
//Updates Roles
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuards)
    @Put(':id/role')
    updateuserRole(@Param('id')id: string,@Body() user:User):Observable<any>{
        return this.Service.updateRole(Number(id),user)
    }
}
