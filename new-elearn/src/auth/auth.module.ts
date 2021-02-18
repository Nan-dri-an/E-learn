import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtStrategy } from './guards/jwt-startegy';
import { RolesGuards } from './guards/roles.guards';
import { AuthService } from './services/auth.service';

@Module({
    imports:[
        forwardRef(()=>UserModule),
        JwtModule.registerAsync({ 
          imports:[ConfigModule.forRoot()],
          inject:[ConfigService],
          useFactory: async (configService: ConfigService)=>({
            secret: configService.get('JWT_SECRET'),
            signOptions:{expiresIn:'10000s'}     
           })
        })
      ],
      providers: [AuthService, RolesGuards,JwtAuthGuard,JwtStrategy],
      exports:[AuthService]
})
export class AuthModule {}
