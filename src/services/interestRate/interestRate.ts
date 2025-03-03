import { InterestRate, InterestRateRq } from '@/types/InterestRate';
import generateTransactionId from '@/utils/Transaction';
import getURL from '@/utils/URL';
import { AxiosError, request } from '@umijs/max';

export async function createInterestRate(interestRate: InterestRateRq) {
  try {
    return await request<APIResponseInterestRate>(
      getURL() + '/interest-rate/save',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          transactionId: generateTransactionId(),
        },
        data: interestRate,
      },
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.data?.data ||
      axiosError.message ||
      'Có lỗi xảy ra khi tạo lãi suất';

    throw new Error(errorMessage);
  }
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
        transactionId: generateTransactionId(),
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
