import { Component, input, output } from '@angular/core';
import { accountFE } from '@progetto-alpha/mylib';


@Component({
  selector: 'app-account-bank',
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
