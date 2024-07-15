import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  accountsDTO,
  mapFromAccountsDTO,
  mapFromTransactionsDTO, mapFromTransactoinsFilterDTO,
  transactionFilterDTO,
  transactionsDTO
} from './apiDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  register(username: string, password: string) {
    return this.http.post('http://localhost:3000/users/registration', {username, password} ).pipe(map((res: any) => {this.authService.setJWT(res.jwt); return {login: true} }))
  }
  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/users/login', {username, password} ).pipe(map((res: any) => {this.authService.setJWT(res.jwt); return {code: res.code} }))
  }

  insertAccount(code: string) {
    return this.http.put('http://localhost:3000/users',{code: code}, {headers: {Authorization: 'Bearer '+ this.authService.getJWT()}})
  }

  getAccounts(){
    return this.http.get<accountsDTO>('http://localhost:3000/users/accounts',{headers: {Authorization: 'Bearer '+ this.authService.getJWT()}}).pipe(
      map((res: accountsDTO) => {
        return mapFromAccountsDTO(res)
      })
    )
  }

  getTransactions(){
    return this.http.get<transactionsDTO>('http://localhost:3000/users/transactions',{headers: {Authorization: 'Bearer '+ this.authService.getJWT()}}).pipe(
      map((res)=> mapFromTransactionsDTO(res))
    )
  }

  getTransactionsFilter(option: number ,id_bank?: number){
    return this.http.get<transactionFilterDTO>('http://localhost:3000/users/transactions/filter', {params: {id_bank: id_bank || -1 , option: option }, headers: {Authorization: 'Bearer '+ this.authService.getJWT()} } ).pipe(
      map((res)=> {
        return mapFromTransactoinsFilterDTO(res, option)
      })
    )
  }

}
