import {
  APIResponseListLoanProduct,
  APIResponseListLoanProductForUser,
  APIResponseLoanProduct,
  LoanProduct,
} from '@/types/LoanProduct';
import generateTransactionId from '@/utils/Transaction';
import getURL from '@/utils/URL';
import { AxiosError, request } from '@umijs/max';
export async function fetchLoanProducts(
  active: boolean,
  pageNumber = 0,
  pageSize = 12,
) {
  return request<APIResponseListLoanProduct>(
    getURL() + '/loan-product/get-all-by-active',
    {
      method: 'GET',
      params: { active, pageNumber, pageSize },
      headers: { transactionId: generateTransactionId() },
    },
  );
}
export async function createLoanProduct(loanProduct: LoanProduct) {
  return request<APIResponseListLoanProduct>(getURL() + '/loan-product/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      transactionId: generateTransactionId(),
    },
    data: loanProduct,
  });
}
export async function deleteLoanProduct(id: string) {
  return request(getURL() + `/loan-product/delete/${id}`, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      transactionId: generateTransactionId(),
    },
  });
}
export async function getDetailLoanProduct(id: string) {
  return request<APIResponseLoanProduct>(getURL() + `/loan-product/${id}`, {
    method: 'GET',
    headers: { transactionId: generateTransactionId() },
  });
}
export async function activedLoanProductApi(id: string) {
  return request(getURL() + `/loan-product/active/${id}`, {
    method: 'PATCH',
    headers: {
      accept: '*/*',
      transactionId: generateTransactionId(),
    },
  });
}
export async function getListLoanProductForUser(pageSize = 12, pageNum = 0) {
  try {
    return await request<APIResponseListLoanProductForUser>(
      getURL() + '/loan-product/get-all-loan-product-active',
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
        params: { pageNum, pageSize },
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

export default function getLoanProductForUser(id: string) {
  try {
    return request<APIResponseLoanProduct>(
      getURL() + `/loan-product/loan-product-detail/${id}`,
      {
        method: 'GET',
        headers: { transactionId: generateTransactionId() },
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
// Định nghĩa kiểu dữ liệu trả về từ API
