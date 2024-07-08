import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from 'mylib/src/lib/service/auth-redirect.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page.component';


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
  }
];
