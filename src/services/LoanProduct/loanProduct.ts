import { request } from 'umi';

export async function fetchLoanProducts(
  active: boolean,
  pageNumber = 0,
  pageSize = 12,
) {
  return request<APIResponse>(
    'http://10.3.245.23:8084/api/v1/loan-product/get-all-by-active',
    {
      method: 'GET',
      params: { active, pageNumber, pageSize },
      headers: { transactionId: '12345abcde' },
    },
  );
}

// Định nghĩa kiểu dữ liệu trả về từ API
export interface InterestRate {
  interestRate: string;
  unit: string;
  minimumAmount: string;
  minimumLoanTerm: string;
}

export interface LoanProduct {
  productId: string;
  productName: string;
  productDescription: string;
  formLoan: string;
  loanLimit: string;
  termLimit: number;
  createdDate: string;
  isActive: boolean;
}

export interface APIResponse {
  data: {
    totalRecords: number;
    loanProductRpList: LoanProduct[];
  };
  message: string;
  status: string;
}
