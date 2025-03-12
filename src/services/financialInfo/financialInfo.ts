import { CustomerFinancialResponse } from './../../types/financialInfo';
import { API } from '@/types/financialInfo';
import request from '@/utils/request';
import generateTransactionId from '@/utils/Transaction';
import APIConfig from '@/utils/URL';

export async function fetchFinancialInfo(status:string) {
  return request<API.FinancialInfoListResponse>(
    APIConfig.LOAN_URL + '/financial-info/individual-customer/get-all-info-by-status',
  {
    method: 'GET',
    params: {
      pageNumber: 0,
      pageSize: 12,
      status: status,
    },
    headers: {
      accept: '*/*',
      transactionId: generateTransactionId(),
    },
  },
  );
}
export async function getInfoFinancialInfoByCifCode(cifCode: string) {
  try {
    return await request<API.FinancialInfoResponse>(
      APIConfig.LOAN_URL + '/financial-info/individual-customer/financial-info/get-info',
      {
        method: 'GET',
        params: { cifCode },
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
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
export async function getDetailFinancialInfoByCifCode(cifCode: string) {
  try {
    return await request<CustomerFinancialResponse>(
      APIConfig.LOAN_URL +`/financial-info/individual-customer/get-detail-info-active/${cifCode}`,
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
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
