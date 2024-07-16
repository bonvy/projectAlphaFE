import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { ApiService } from 'mylib/src/lib/service/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration-page',
  templateUrl: './registrationPage.component.html',
  styleUrl: './registrationPage.component.css',
})
export class RegistrationPageComponent {

  form: FormGroup;



  constructor(private api: ApiService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
    })
  }


  registration(){

    if(this.form.controls['username'].value && this.form.controls['password'].value ){
      this.api.register(this.form.controls['username'].value, this.form.controls['password'].value).subscribe((resp)=>{
        if(resp.login){
          this.router.navigate(['/mainPage']);
        }
      });
    }

  }



}
