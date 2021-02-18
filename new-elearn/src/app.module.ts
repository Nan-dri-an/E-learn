import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/models/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { BlogEntryEntity } from './blog/model/blog-entry.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      "type":"mysql",
      "host":"localhost",
      "port":3306,
      "username":"root",
      "password":"",
      "database":"Learn",
      "synchronize":true,
      "logging":true,  
      "entities":[UserEntity,BlogEntryEntity]
    }),
    MulterModule.register({
      dest: './uploads/videos',
    }),
    UserModule,
    AuthModule,
    BlogModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
