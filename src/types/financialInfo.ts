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
    financialInfoId:string
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
export interface FinancialDetail {
  customerId?: string;
  customerName?: string;
  numberPhone?: string;
  identificationNumber?: string;
  dateOfBirth?: string;
  financialInfoId?: string;
  amountLoanLimit?: string;
  amountMaybeLoanRemain?: string;
  requestStatus?: string;
  balanceBankingAccount?: string;
  bankingAccountNumber?: string;
  isExpired?:boolean;
  applicableObjects?:string
  expiredDate?:string
  isRegistered?:boolean
}
export interface CustomerFinancialResponse {
  datadata: FinancialDetail;
  message: string;
  status: string;
}
export interface PieChartData {
  key: string;
  value: number;
  realValue: number;
}

export interface ApiChartResponse {
  data: PieChartData[];
  message: string;
  status: string;
}

export interface LegalDocument {
  legalDocumentId: string;
  description: string;
  imageBase64: string;
  documentType: string;
  requestStatus: string;
  expirationDate: string;
}

export interface FinancialInfoDetailRp {
  customerId: string;
  financialInfoId: string;
  income: string;
  unit: string;
  creditScore: string;
  incomeSource: string;
  incomeType: string;
  debtStatus: string;
  isExpired: boolean;
  requestStatus: string;
  expiredDate: string;
  amountLoanLimit: string;
  legalDocumentRpList: LegalDocument[];
}
