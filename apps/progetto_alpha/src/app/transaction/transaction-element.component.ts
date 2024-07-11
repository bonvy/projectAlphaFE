import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { transactionFE } from '@progetto-alpha/mylib';


@Component({
  selector: 'app-transaction-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-element.component.html',
  styleUrl: './transaction-element.component.css',
})
export class TransactionElementComponent {

  transaction = input<transactionFE>()
}
