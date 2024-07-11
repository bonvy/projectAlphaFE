import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Button } from 'primeng/button';
import { accountFE, getMesi, ServiceModule, transactionFE } from '@progetto-alpha/mylib';
import { ApiService } from 'mylib/src/lib/service/api.service';
import { AccountBankComponent } from './account_bank/account_bank.component';
import { DataViewModule } from 'primeng/dataview';
import { TransactionElementComponent } from './transaction/transaction-element.component';
import { ScrollerModule } from 'primeng/scroller';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, Button, ServiceModule, AccountBankComponent, DataViewModule, TransactionElementComponent, ScrollerModule, TableModule, TabViewModule, ChartModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit{
  documentStyle = getComputedStyle(document.documentElement);
  accounts = signal<accountFE[]>([])
  transcations = signal<transactionFE[]>([])
  activeIndex = 0;

  data: any;

  options: any;
  constructor(private route: ActivatedRoute,private api: ApiService, private cdf: ChangeDetectorRef)  {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      if(code){
        this.api.insertAccount(code).subscribe()
      }
    });
    this.api.getAccounts().subscribe((res)=>{
      this.accounts.set(res)
      this.selectAccount(this.activeIndex);
    });

  }

  connect(){
    window.location.replace('https://prova-sandbox.biapi.pro/2.0/auth/webview/connect' +
      '?client_id=63430452' +
      '&redirect_uri=http://localhost:4200/')
  }

  fetchTransaction(id_bank: number){
    this.api.getTransactionsFilter(id_bank).subscribe((data) =>{
      const mesi: number[]=[];
      const entrate: number[] =[]
      const uscite: number[] =[]
      data.entrate.forEach((ele) =>{
        mesi.push(ele.mese)
        entrate.push(ele.sum)
      })


      data.uscite.forEach((ele) =>{
        uscite.push(-1*ele.sum)
      })

      this.data = {
        labels: getMesi(mesi),
        datasets: [
          {
            label: 'Entrate',
            backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
            borderColor: this.documentStyle.getPropertyValue('--blue-500'),
            data: entrate
          },
          {
            label: 'Uscite',
            backgroundColor: this.documentStyle.getPropertyValue('--pink-500'),
            borderColor: this.documentStyle.getPropertyValue('--pink-500'),
            data: uscite
          }
        ]
      };
      this.cdf.markForCheck();
    });
  }



  selectAccount(account: number){
    if(account!=null){
      const tmp = this.accounts()[account]
      this.api.getTransactions().subscribe((res) =>{
        this.transcations.set(res.filter((t)=>t.id_bank === tmp.id))
      });
      this.fetchTransaction(tmp.id)
    }

  }

}
