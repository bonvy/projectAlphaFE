import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { accountFE } from '@progetto-alpha/mylib';


@Component({
  selector: 'app-account-bank',
  standalone: true,
  imports: [CommonModule, CardModule, Button],
  templateUrl: './account_bank.component.html',
  styleUrl: './account_bank.component.css',
})
export class AccountBankComponent {

  account = input<accountFE>()
  selected = output<accountFE | undefined>();

  select(){
    if(this.account()){
      this.selected.emit(this.account())
    }

  }
}
