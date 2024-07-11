import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { AuthGuard } from './auth-redirect.guard';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideHttpClient(), CookieService, ApiService, AuthGuard]

})
export class ServiceModule { }
