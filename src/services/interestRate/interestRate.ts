import { InterestRate, InterestRateRq } from '@/types/InterestRate';
import generateTransactionId from '@/utils/Transaction';
import getURL from '@/utils/URL';
import { request } from '@umijs/max';

export async function createInterestRate(interestRate: InterestRateRq) {
  return request<APIResponseInterestRate>(getURL() + '/interest-rate/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      transactionId: generateTransactionId(),
    },
    data: interestRate,
  });
}
export async function getInterestRateByLoanProductId(
  loanProductId: string,
  pageNumber = 0,
  pageSize = 12,
) {
  return request<LoanProductResponse>(
    getURL() + `/interest-rate/get-all-loan-product/${loanProductId}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        transactionId: '02787b44-f26e-40e8-a4d8-c',
      },
      params: { pageNumber, pageSize },
    },
  );
}
export interface APIResponseInterestRate {
  data: string;
  message: string;
  status: string;
}

export interface LoanProductResponse {
  data: {
    totalRecord: number;
    interestRateList: InterestRate[];
  };
  message: string;
  status: string;
}
