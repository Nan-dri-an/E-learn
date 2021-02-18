import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import {  MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule  } from "@angular/material/icon";
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { AllBlogComponent } from './components/all-blog/all-blog.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';

import { CreateBlogEntryComponent } from './components/create-blog-entry/create-blog-entry.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptor } from './Interceptors/token.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    HomeComponent,
    AllBlogComponent,
    UpdateUserProfileComponent,
    CreateBlogEntryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //Liaison avec back
    HttpClientModule,

    //toolbar view
    MatToolbarModule,

    //formulaire et boutton
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    //table
    MatTableModule,
    //card
    MatCardModule,
    //barModule
    MatProgressBarModule,
    //Icon
    MatIconModule,
    //token
    /*JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return  localStorage.getItem('blog-token')
        },
        allowedDomains:['localhost:4200'],
        disallowedRoutes:['localhost:4200/login']
      }
    })*/
  ],
  providers: [
    //Token
    JwtHelperService,{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
