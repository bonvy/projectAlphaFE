import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import {
  accountsDTO,
  mapFromAccountsDTO,
  mapFromTransactionsDTO, mapFromTransactoinsFilterDTO,
  transactionFilterDTO,
  transactionsDTO
} from './apiDTO.model';

import { API_MODULE_CONFIGURATION, Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private domain: string;
  constructor(private http: HttpClient, private authService: AuthService, @Inject(API_MODULE_CONFIGURATION) private config: Configuration) {
    this.domain = this.config.apiUrl
  }

  register(username: string, password: string) {
    return this.http.post(this.domain+'/users/registration', {username, password} ).pipe(map((res: any) => {this.authService.setJWT(res.jwt); return {login: true} }))
  }
  login(username: string, password: string) {
    return this.http.post(this.domain+'/users/login', {username, password} ).pipe(map((res: any) => {this.authService.setJWT(res.jwt); return {code: res.code} }))
  }

  insertAccount(code: string) {
    return this.http.put(this.domain+'/users',{code: code}, {headers: {Authorization: 'Bearer '+ this.authService.getJWT()}})
  }

  getAccounts(){
    return this.http.get<accountsDTO>(this.domain+'/users/accounts',{headers: {Authorization: 'Bearer '+ this.authService.getJWT()}}).pipe(
      map((res: accountsDTO) => {
        return mapFromAccountsDTO(res)
      })
    )
  }

  getTransactions(){
    return this.http.get<transactionsDTO>(this.domain+'/users/transactions',{headers: {Authorization: 'Bearer '+ this.authService.getJWT()}}).pipe(
      map((res)=> mapFromTransactionsDTO(res))
    )
  }

  getTransactionsFilter(option: number ,id_bank?: number){

    return this.http.get<transactionFilterDTO>(this.domain + '/users/transactions/filter', {params: {id_bank: id_bank || -1 , option: option }, headers: {Authorization: 'Bearer '+ this.authService.getJWT()} } ).pipe(
      map((res)=> {
        return mapFromTransactoinsFilterDTO(res, option)
      })
    )
  }

}
