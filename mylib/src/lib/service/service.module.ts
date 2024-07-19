import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { AuthGuard } from './auth-redirect.guard';
import { API_MODULE_CONFIGURATION, Configuration } from './configuration';
import { AuthInterceptor } from './interceptors/auth-interceptor.interceptor';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import Errors = ts.server.Errors;
import { ErrorInterceptor } from './interceptors/error.interceptor';




@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: []
})
export class ServiceModule {
  public static forRoot(config: Configuration): ModuleWithProviders<ServiceModule>{
    return {
      ngModule: ServiceModule,
      providers: [
        CookieService,
        AuthGuard,
        ApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        {provide: API_MODULE_CONFIGURATION, useValue: config},

      ]
    }
  }
}
