import { accountFE, transactionFE, transactionFilter, transactionFilterAggregate } from './FE.model';


export interface accountDTO {
  bank_name: string;
  balance: number;
  currency: string;
  id: number;
  iban: string;
}

export interface accountsDTO {
  accounts: accountDTO[];
}

export function mapFromAccountsDTO(accountsDTO: accountsDTO): accountFE[] {
  const acc: accountFE[] = [];

  accountsDTO.accounts.forEach(account => {
    acc.push({
      bank_name: account.bank_name,
      balance: account.balance,
      currency: account.currency,
      id: account.id,
      iban: account.iban
    });
  });

  return acc;
}

export interface transactionDTO {
  id: number;
  id_user: number;
  id_bank: number;
  value: number;
  date: string;
  categoria: string;
}

export interface transactionsDTO {
  transactions: transactionDTO[];
}

export function mapFromTransactionsDTO(transactionsDTO: transactionsDTO): transactionFE[] {
  const tran: transactionFE[] = [];

  transactionsDTO.transactions.forEach(tra => {
    tran.push({
      id: tra.id,
      id_user: tra.id_user,
      id_bank: tra.id_bank,
      value: tra.value,
      date: tra.date,
      categoria: tra.categoria
    });
  });

  return tran;
}


export interface dataAggregateDTO{
  mounth?: number,
  year?: number
  entrate: number,
  uscite: number
}

export interface transactionFilterDTO{
  data: dataAggregateDTO[];
}

export function mapFromTransactoinsFilterDTO(data: transactionFilterDTO, option: number): transactionFilterAggregate{
  const bankValue: transactionFilterAggregate = {entrate: [], uscite:[]};

  data.data.forEach((data) =>{


  if(data?.mounth!=null){
    bankValue.entrate.push({
      sum: data.entrate,
      mese: data.mounth
    });
  }else{
    bankValue.entrate.push({
      sum: data.entrate,
      year: data.year
    });
  }

  })

  data.data.forEach((data) =>{



    if(data?.mounth!=null){
      bankValue.uscite.push({
        sum: data.uscite,
        mese: data.mounth
      });
    }else{
      bankValue.uscite.push({
        sum: data.uscite,
        year: data.year
      });
    }
  })

  return bankValue;
}
