import { BaseResponse } from './LoanInfo';
export interface TransactionHistoryRp {
    id: string;
    dateCreated: string;
    amount: string;
    description: string;
    isTransfer: boolean;
    senderAccountNumber: string;
    receiverAccountNumber: string;
    transactionType: string;
}
export interface BaseResponseHistoryTransaction {
    content: TransactionHistoryRp[]
    totalPages: number,
    totalRecord: number
}
export interface TransactionRequest{
    cifCode?: string;
    senderAccountId?: string;
    senderAccount?: string;
    senderAccountType?: 'PAYMENT';
    receiverAccount?: string;
    receiverAccountType?: 'PAYMENT';
    amount?: number;
    fee?: number;
    feePayer?: 'SENDER' | 'RECEIVER';
    note?: string;
    initiator?: 'CUSTOMER' | 'STAFF'; 
    method?: 'ONLINE_BANKING' | 'MOBILE_BANKING' | 'ATM'; 
    type?: 'TRANSFER' | 'WITHDRAW' | 'DEPOSIT'; 
    description?: string;
  }
  