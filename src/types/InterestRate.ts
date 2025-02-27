export interface InterestRate {
  id: string;
  interestRate: number;
  unit: string;
  isActive: string;
  minimumAmount: number;
  dateActive: string;
  minimumLoanTerm: number;
  createdDate: string;
}
export interface InterestRateRq {
  loanProductId: string;
  interestRate: number;
  unit: string;
  minimumAmount: number;
  minimumLoanTerm: number;
}
