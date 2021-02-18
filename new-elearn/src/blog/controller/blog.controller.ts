import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { from, Observable,of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { BlogEntry } from '../model/blog-entry.interface';
import { BlogService } from '../blog/blog.service';
import { UserIsAuthorGuard } from '../guards/UserIsAuthor.Guards';

import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { UserRole } from 'src/user/models/user.interface';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer'; 
import {v4 as uuidv4} from 'uuid';
import path = require('path')
import { join } from 'path';
export const storage = {
    storage: diskStorage({
        destination:'./uploads/videos',
        filename:(req,file,cb)=>{
            const filename:string =path.parse(file.originalname).name.replace(/\s/g,'')+uuidv4()
            const extension:string=path.parse(file.originalname).ext

            cb(null,String(filename)+String(extension))
        }
        
    })
}


@Controller('blogs')
export class BlogController {
    constructor(private blogService:BlogService){}

    //Create
    @hasRoles(UserRole.ADMIN,UserRole.PROF)
    @UseGuards(JwtAuthGuard,RolesGuards)
    @Post()
    create(@Body() blogEntry:BlogEntry,@Request()req):Observable<BlogEntry>{
       const user = req.user
       return this.blogService.create(user, blogEntry)
    }

    //read
    @Get()
    findBlogEntries(@Query('userId')userId:Number):Observable<BlogEntry[]>{
        if (userId==null) {
            return this.blogService.findAll()    
        } else {
            return this.blogService.findByUser(userId)
            
        }
    }

    @Get(':id')
    findOne(@Param()param): Observable<BlogEntry>{
        return this.blogService.findOne(param.id)
    }

    @UseGuards(JwtAuthGuard,UserIsAuthorGuard)
    @Put(':id')
    updateOne(@Param('id')id :Number,@Body()blogEntry: BlogEntry):Observable<BlogEntry>{
        return this.blogService.updateOne(Number(id),blogEntry)
    }
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<any>{
        return this.blogService.deleteOne(Number(id))
    }
    @hasRoles(UserRole.ADMIN,UserRole.PROF)
    @UseGuards(JwtAuthGuard,RolesGuards)
    @Post('video/upload')
    @UseInterceptors(FileInterceptor('file',storage))
    uploadFile(@UploadedFile()file,@Request() req):Observable<object>{
        console.log(file)
        return of(file)
    } 
    @Get('video/:videoname')
    findImage(@Param('videoname')videoname,@Res()res):Observable<Object> {
    return of(res.sendFile(join(process.cwd(),'./uploads/videos/'+videoname)));
    }


}
