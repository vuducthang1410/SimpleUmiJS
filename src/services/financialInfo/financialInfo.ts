import { API } from '@/types/financialInfo';
import { request } from '@umijs/max';

export async function fetchFinancialInfo() {
  return request<API.FinancialInfoResponse>(
    'http://10.3.245.23:8084/api/v1/financial-info/individual-customer/get-all-info-by-status',
    {
      method: 'GET',
      params: {
        pageNumber: 0,
        pageSize: 12,
        status: 'PENDING',
      },
      headers: {
        accept: '*/*',
        transactionId: '1234567890',
      },
    },
  );
}
