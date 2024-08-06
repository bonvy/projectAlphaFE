import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { accountFE, getMesi, transactionFE } from '@progetto-alpha/mylib';
import { ApiService } from 'mylib/src/lib/service/api.service';
import { Subject, takeUntil } from 'rxjs';
import {environment} from '../environment/environment';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy{
  documentStyle = getComputedStyle(document.documentElement);
  env = environment;
  transcations = signal<transactionFE[] |undefined >(undefined)
  accountSelect = signal<accountFE| undefined >(undefined)
  onDestroy$ = new Subject<void>();
  data: any;
  options: any;
  constructor(private route: ActivatedRoute,private api: ApiService, private cdf: ChangeDetectorRef, private router: Router, private noti: NotificationService)  {
  }

  ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    not(){
      this.noti.showNotification()

    }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      if(code){
        this.api.insertAccount(code).pipe(takeUntil(this.onDestroy$)).subscribe()

      }
      this.router.navigate(['/mainPage'], {
        queryParams: {},
        replaceUrl: true
      });

    });

  }



  fetchTransaction(id_bank: number, option: number){
    this.api.getTransactionsFilter(option, id_bank ).pipe(takeUntil(this.onDestroy$)).subscribe((data) =>{
      const mesi: number[]=[];
      const anni: string[]=[]
      const entrate: number[] =[]
      const uscite: number[] =[]
      data.entrate.forEach((ele) =>{

        if(ele.year){
          anni.push(ele.year.toString())
        }else{
          mesi.push(ele.mese!)
        }
        entrate.push(ele.sum)
        data.uscite.forEach((ele) =>{
          uscite.push(-1*ele.sum)
        })



      })

      if(option === 0){



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
      }
      else{


        this.data =  {
          labels: anni.reverse(),
          datasets: [
            {
              label: 'Entrate',
              backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
              borderColor: this.documentStyle.getPropertyValue('--blue-500'),
              data: entrate.reverse()
            },
            {
              label: 'Uscite',
              backgroundColor: this.documentStyle.getPropertyValue('--pink-500'),
              borderColor: this.documentStyle.getPropertyValue('--pink-500'),
              data: uscite.reverse()
            }
          ]
        };
      }



      this.cdf.markForCheck();
    });
  }



  selectAccount(account: accountFE){
    this.transcations.set(undefined);
    if(account!=null){
      this.accountSelect.set(account);
      this.api.getTransactions().pipe(takeUntil(this.onDestroy$)).subscribe((res) =>{
        this.transcations.set(res.filter((t)=>t.id_bank === account.id))
        this.cdf.markForCheck();
      });
      this.fetchTransaction(account.id,0)
    }

  }

  get entrate(): number{
    const now = new Date();
    let value = 0;
    if(this.transcations()!==undefined){
       this.transcations()?.filter((tra) =>{
        const tmpD =  new Date(tra.date)
         const diff = now.getTime() - tmpD.getTime();


         const differenceInDays = Math.abs(diff / (1000 * 60 * 60 * 24));
        return differenceInDays <= 7;
      }).filter((tra)=> tra.value>=0).forEach((tra) =>{
        value+=tra.value;
      })
    }
    return value;
  }

  get uscite(): number{
    const now = new Date();
    let value = 0;
    if(this.transcations()!==undefined){
       this.transcations()?.filter((tra) =>{
        const tmpD =  new Date(tra.date)
         const diff = now.getTime() - tmpD.getTime();


         const differenceInDays = Math.abs(diff / (1000 * 60 * 60 * 24));
        return differenceInDays <= 7;
      }).filter((tra)=> tra.value<0).forEach((tra) =>{
        value+=tra.value;
      })
    }
    return value;
  }

}
