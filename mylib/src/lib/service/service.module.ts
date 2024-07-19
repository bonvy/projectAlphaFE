import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { AuthGuard } from './auth-redirect.guard';
import { API_MODULE_CONFIGURATION, Configuration } from './configuration';




@NgModule({
  declarations: [],

  imports: [
    CommonModule
  ]

})
export class ServiceModule {
  public static forRoot(config: Configuration): ModuleWithProviders<ServiceModule>{
    return {
      ngModule: ServiceModule,
      providers: [
        provideHttpClient(),
        CookieService,
        ApiService,
        AuthGuard,
        {provide: API_MODULE_CONFIGURATION, useValue: config},
      ]
    }
  }
}
