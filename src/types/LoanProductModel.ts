import { InterestRate } from './InterestRate';

export interface LoanProduct {
  nameLoanProduct: string;
  loanLimit: number;
  description: string;
  utilities: string;
  loanCondition: string;
  loanForm: LoanForm;
  applicableObjects: ApplicableObjects;
  termLimit: number;
}
export enum LoanForm {
  SECURED_LOAN = 'SECURED_LOAN',
  UNSECURED_LOAN = 'UNSECURED_LOAN',
}

export enum ApplicableObjects {
  BUSINESS_CUSTOMER = 'BUSINESS_CUSTOMER',
  INDIVIDUAL_CUSTOMER = 'INDIVIDUAL_CUSTOMER',
}
export interface LoanProductRp {
  productId: string;
  productName: string;
  productDescription: string;
  formLoan: string;
  loanLimit: string;
  termLimit: number;
  createdDate: string;
  isActive: boolean;
  applicableObjects: string;
  interestRate: InterestRate[];
}
