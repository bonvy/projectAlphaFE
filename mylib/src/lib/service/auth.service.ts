import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {
    this.jwt = this.cookieService.get('jwt');
  }



  private jwt?: string;

  setJWT(jwt: string) {
    this.jwt = jwt;
    if(this.jwt){
      const date = new Date();
      date.setTime(date.getTime() + (30 * 60 * 1000));
      this.cookieService.set('jwt',this.jwt,date)
    }
  }
  getJWT(){
    this.jwt ?this.setJWT(this.jwt) : null;
    return this.jwt;
  }

}
