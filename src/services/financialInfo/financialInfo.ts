import { BaseResponse } from '@/types/LoanInfo';
import { CustomerFinancialResponse } from './../../types/financialInfo';
import { API } from '@/types/financialInfo';
import request from '@/utils/request';
import generateTransactionId from '@/utils/Transaction';
import APIConfig from '@/utils/URL';
import { handleApiError } from '@/utils/error';

export async function fetchFinancialInfo(status: string) {
  try {
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
  } catch (error) {
    await handleApiError(error)
  }

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
    await handleApiError(error)
  }
}
export async function getDetailFinancialInfoByCifCode(cifCode: string) {
  try {
    return await request<CustomerFinancialResponse>(
      APIConfig.LOAN_URL + `/financial-info/individual-customer/get-detail-info-active/${cifCode}`,
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
      },
    );
  } catch (error) {
    await handleApiError(error);
  }
}
export async function registerFInancialInfo(formData: FormData) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL + '/financial-info/individual-customer/save-info',
      {
        method: 'POST',
        headers: {
          transactionId: generateTransactionId(),
        },
        data: formData,
      },
    );
  } catch (error: any) {
    await handleApiError(error)
  }
}
export async function approvedFinancialRequestRegister(data: any) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL + '/financial-info/individual-customer/financial-info/approve',
      {
        method: 'PATCH',
        headers: {
          transactionId: generateTransactionId(),
        },
        data: data,
      },
    );
  } catch (error: any) {
    await handleApiError(error)
  }
}

export async function getDetailStatisticalByCifCode(cifCode: string) {
  try {
    return await request<CustomerFinancialResponse>(
      APIConfig.LOAN_URL + `/financial-info/individual-customer/financial-info/statistical-loan-by-cifCode`,
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
        params:{cifCode:cifCode}
      },
    );
  } catch (error) {
    await handleApiError(error);
  }
}