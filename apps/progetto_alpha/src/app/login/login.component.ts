import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Subject, takeUntil } from 'rxjs';
import { ServiceModule } from '@progetto-alpha/mylib';
import { ApiService } from 'mylib/src/lib/service/api.service';
import { MessagesModule } from 'primeng/messages';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../mylib/src/lib/service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    ReactiveFormsModule,
    DividerModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    ServiceModule,
    MessagesModule
  ],
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
