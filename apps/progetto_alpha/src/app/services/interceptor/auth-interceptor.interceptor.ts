import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../mylib/src/lib/service/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.getJWT();
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return next.handle(clonedRequest);
  }
}
