import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Subject, takeUntil } from 'rxjs';


import {  Router } from '@angular/router';

import { ApiService } from 'mylib/src/lib/service/api.service';
import { AuthService } from 'mylib/src/lib/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy, OnInit{

  constructor(private api: ApiService,private auth: AuthService,private router: Router)  {
  }

  ngOnInit(): void {
        if(this.auth.getJWT() ){
          this.router.navigate(['/mainPage']);
        }
  }

  ngOnDestroy(): void {
        this.onDestroy$.unsubscribe();
  }
  showError = false
  onDestroy$ = new Subject();
  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })
 messages = [



  ];

  login(){
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    if(username && password){
      this.showError=false;
      this.api.login(username,password).pipe(takeUntil(this.onDestroy$)).subscribe((resp:any)=> {
        this.showError = resp?.code === 400
        !this.showError ? this.router.navigate(['/mainPage']) : undefined;
      }
      )
    }

  }
}
