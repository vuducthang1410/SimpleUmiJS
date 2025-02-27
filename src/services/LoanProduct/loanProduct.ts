import { LoanProduct, LoanProductRp } from '@/types/LoanProductModel';
import generateTransactionId from '@/utils/Transaction';
import getURL from '@/utils/URL';
import { request } from '@umijs/max';
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
// Định nghĩa kiểu dữ liệu trả về từ API

export interface APIResponseLoanProduct {
  data: LoanProductRp;
  message: string;
  status: string;
}
export interface APIResponseListLoanProduct {
  data: {
    totalRecords: number;
    loanProductRpList: LoanProductRp[];
  };
  message: string;
  status: string;
}
