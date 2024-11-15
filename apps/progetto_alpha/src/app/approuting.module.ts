import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceModule } from '@progetto-alpha/mylib';
import { AuthGuard } from 'mylib/src/lib/service/auth-redirect.guard';
import { RegistrationPageComponent } from './components/registrationPage.component';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainPageComponent

  },{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mainPage',
    canActivate: [AuthGuard],
    component:  MainPageComponent
  },
  {
    path: 'registration',
    component: RegistrationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), ServiceModule],
  exports: [RouterModule]
})
export class ApproutingModule { }
