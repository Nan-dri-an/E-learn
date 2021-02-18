import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable,of  } from 'rxjs';
import { User } from 'src/user/models/user.interface';

const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
    constructor(private readonly jwtService:JwtService){}

    generateJWT(user: User):Observable<string>{
        return from(this.jwtService.signAsync({user}))

    }

    hashPassword(password: string):Observable<string>{
        return from<string>(bcrypt.hash(password,12))

    }
    
    comparePasswords(password:string, PasswordHash: string): Observable<any>{
        return of <any|boolean> (bcrypt.compare(password, PasswordHash))
    }
}
