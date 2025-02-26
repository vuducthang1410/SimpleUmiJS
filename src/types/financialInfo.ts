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

  export interface FinancialInfoResponse {
    data: {
      totalRecords: number;
      financialInfoRpList: FinancialInfoItem[];
    };
    message: string;
    status: string;
  }
}
