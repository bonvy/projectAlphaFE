import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ServiceModule } from '@progetto-alpha/mylib';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainPageComponent } from './main-page.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { LoginComponent } from './components/login/login.component';
import { AccountBankComponent } from './components/account_bank/account_bank.component';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ApproutingModule } from './approuting.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { EnterExitPanelComponent } from './components/enterExit/enterExitPanel.component';
import { RegistrationPageComponent } from './components/registrationPage.component';
import {environment} from '../environment/environment';

const imports =[
  CommonModule,
  ServiceModule.forRoot({
    apiUrl: environment.apiUrl
  })
];

@NgModule({
  declarations: [SidebarComponent, AppComponent, MainPageComponent, TransactionComponent, LoginComponent, AccountBankComponent, EnterExitPanelComponent, RegistrationPageComponent],
  imports: [
    ...imports,
    BrowserModule,
    BrowserAnimationsModule,
    RippleModule,
    ApproutingModule,
    ButtonModule,
    InputTextareaModule,
    CardModule,
    FloatLabelModule,
    ReactiveFormsModule,
    Button,
    SidebarModule,
    TabViewModule,
    DataViewModule,
    TableModule,
    SkeletonModule,
    StyleClassModule,
    ChartModule,
    RouterOutlet,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
