import { InterestRate, InterestRateRq } from '@/types/InterestRate';
import { BaseResponse } from '@/types/LoanInfo';
import { handleApiError } from '@/utils/error';
import request from '@/utils/request';
import generateTransactionId from '@/utils/Transaction';
import APIConfig from '@/utils/URL';

export async function createInterestRate(interestRate: InterestRateRq) {
  try {
    return await request<APIResponseInterestRate>(
      APIConfig.LOAN_URL + '/interest-rate/save',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          transactionId: generateTransactionId(),
        },
        data: interestRate,
      },
    );
  } catch (error: any) {
    await handleApiError(error)
  }
}

export async function getInterestRateByLoanProductId(
  loanProductId: string,
  pageNumber = 0,
  pageSize = 12,
) {
  try {
   return request<LoanProductResponse>(
    APIConfig.LOAN_URL + `/interest-rate/get-all-loan-product/${loanProductId}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        transactionId: generateTransactionId(),
      },
      params: { pageNumber, pageSize },
    },
  );   
  } catch (error) {
    await handleApiError(error)
  }

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
