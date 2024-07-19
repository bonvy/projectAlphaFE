import { ChangeDetectorRef, Component, OnInit, output, signal } from '@angular/core';
import { accountFE } from '@progetto-alpha/mylib';
import { ApiService } from 'mylib/src/lib/service/api.service';
import {environment } from '../../../environment/environment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  env=environment;
  sidebarVisible = true;
  constructor(private cdf: ChangeDetectorRef, private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getAccounts().subscribe((res)=>{
      this.accounts.set(res)
      this.loading.set(false)
    });
    }

  accounts = signal<accountFE[]>([])
  loading = signal<boolean>(true)
  showAccouts = signal<boolean>(false)
  selectedAccount = output<accountFE>()
  showAccountsNow(){
    if(!this.loading()){
      this.showAccouts.set(!this.showAccouts())
    }
  }
  selectAccount(account: accountFE){
    this.selectedAccount.emit(account)
  }

  connect(){
    if(!this.env.production){
      window.location.replace('https://prova-sandbox.biapi.pro/2.0/auth/webview/connect' +
        '?client_id=63430452' +
        '&redirect_uri=http://localhost:4200/')
    }else{
      window.location.replace('https://prova-sandbox.biapi.pro/2.0/auth/webview/connect' +
        '?client_id=63430452' +
        '&redirect_uri=https://main.d2yw5v0xgpzh27.amplifyapp.com')
    }
  }
}
