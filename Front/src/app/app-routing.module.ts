import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogEntryComponent } from './components/create-blog-entry/create-blog-entry.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'admin',//chemin de routage pour la page learn
    loadChildren: ()=>import ('./admin/admin.module').then(m=>m.AdminModule)

  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'update-profile',
    component:UpdateUserProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'create-blog-entry',
    component:CreateBlogEntryComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
