export namespace API {
  export interface FinancialInfoItem {
    income: string;
    unit: string;
    creditScore: string;
    incomeSource: string;
    incomeType: string;
    debtStatus: string;
    countLegalDocument: number;
    isExpired: boolean;
    amountLoanLimit: number;
  }

  export interface FinancialInfoListResponse {
    data: {
      totalRecords: number;
      financialInfoRpList: FinancialInfoItem[];
    };
    message: string;
    status: string;
  }
  export interface FinancialInfoRp {
    customerId: string;
    customerName: string;
    dateOfBirth: string;
    identificationNumber: string;
    numberPhone: string;
    amountLoanLimit: number;
  }

  export interface FinancialInfoResponse {
    financialInfoRq: FinancialInfoRp;
    message: string;
    status: string;
  }
}
