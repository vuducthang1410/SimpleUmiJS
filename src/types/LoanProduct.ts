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
  imgUrl: string;
  termLimit: number;
  createdDate: string;
  loanCondition: string;
  utilities:string;
  isActive: boolean;
  applicableObjects: string;
  interestRate: InterestRate[];
}
export interface LoanProductForUserRp {
  loanProductId: string;
  nameLoanProduct: string;
  urlImage: string;
  minInterestRate: number;
  maxInterestRate: number;
  maxLoanAmount: string;
  maxLoanTerm: number;
}
export interface APIResponseLoanProduct {
  data: LoanProductRp;
  message: string;
  status: string;
}
export interface APIResponseListLoanProduct {
  data: {
    totalRecords: number;
    loanProductRpList: LoanProductRp[];
  };
  message: string;
  status: string;
}
export interface APIResponseListLoanProductForUser {
  data: {
    totalRecords: number;
    loanProductForUserRpList: LoanProductForUserRp[];
  };
  message: string;
  status: string;
}
