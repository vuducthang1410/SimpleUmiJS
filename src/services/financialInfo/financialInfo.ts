import { API } from '@/types/financialInfo';
import generateTransactionId from '@/utils/Transaction';
import getURL from '@/utils/URL';
import { request } from '@umijs/max';

export async function fetchFinancialInfo() {
  return request<API.FinancialInfoListResponse>(
    getURL() + '/financial-info/individual-customer/get-all-info-by-status',
    {
      method: 'GET',
      params: {
        pageNumber: 0,
        pageSize: 12,
        status: 'PENDING',
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
      getURL() + '/financial-info/individual-customer/financial-info/get-info',
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
