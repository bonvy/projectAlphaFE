export interface accountFE{
  bank_name: string;
  balance: number;
  currency: string;
  id: number;
  iban: string;
}


export interface transactionFE{
  id: number;
  id_user: number;
  id_bank: number;
  value: number;
  date: string;
  categoria: string;
}


export interface transactionFilter{
  sum: number,
  mese?: number,
  year?: number
}

export interface transactionFilterAggregate {
  entrate: transactionFilter[],
  uscite: transactionFilter[]
}



export function getMesi(mesi: number[]){

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile',
    'Maggio', 'Giugno', 'Luglio', 'Agosto',
    'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  const tmp : string[] =[];

  mesi.forEach((m) => tmp.push(monthNames[m]))

  return tmp;
}
