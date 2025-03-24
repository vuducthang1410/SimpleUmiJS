import {
  APIResponseListLoanProduct,
  APIResponseListLoanProductForUser,
  APIResponseLoanProduct,
  LoanProduct,
} from '@/types/LoanProduct';
import { handleApiError } from '@/utils/error';
import request from '@/utils/request';
import generateTransactionId from '@/utils/Transaction';
import APIConfig from '@/utils/URL';
export async function fetchLoanProducts(
  active: boolean,
  pageNumber = 0,
  pageSize = 12,
) {
  try {
    return request<APIResponseListLoanProduct>(
      APIConfig.LOAN_URL + '/loan-product/get-all-by-active',
      {
        method: 'GET',
        params: { active, pageNumber, pageSize },
        headers: { transactionId: generateTransactionId() },
      },
    );
  } catch (error) {
    await handleApiError(error);
  }

}
export async function createLoanProduct(loanProduct: LoanProduct) {
  try {
    return request<APIResponseListLoanProduct>(APIConfig.LOAN_URL + '/loan-product/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        transactionId: generateTransactionId(),
      },
      data: loanProduct,
    });
  } catch (error) {
    await handleApiError(error);
  }

}
export async function deleteLoanProduct(id: string) {
  try {
    return request(APIConfig.LOAN_URL + `/loan-product/delete/${id}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
        transactionId: generateTransactionId(),
      },
    });
  } catch (error) {
    await handleApiError(error);
  }

}
export async function getDetailLoanProduct(id: string) {
  try {
    return request<APIResponseLoanProduct>(APIConfig.LOAN_URL + `/loan-product/${id}`, {
      method: 'GET',
      headers: { transactionId: generateTransactionId() },
    });
  } catch (error) {
    await handleApiError(error);
  }

}
export async function activedLoanProductApi(id: string) {
  try {
    return request(APIConfig.LOAN_URL + `/loan-product/active/${id}`, {
      method: 'PATCH',
      headers: {
        accept: '*/*',
        transactionId: generateTransactionId(),
      },
    });
  } catch (error) {
    await handleApiError(error);
  }

}
export async function getListLoanProductForUser(pageSize = 12, pageNum = 0, applicableObject: string) {
  try {
    return await request<APIResponseListLoanProductForUser>(
      APIConfig.LOAN_URL + '/loan-product/get-all-loan-product-active-and-applicable-object',
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
        params: { pageNum, pageSize, applicableObject },
      },
    );
  } catch (error) {
    await handleApiError(error);
  }
}

export async function getLoanProductForUser(id: string) {
  try {
    return request<APIResponseLoanProduct>(
      APIConfig.LOAN_URL + `/loan-product/loan-product-detail/${id}`,
      {
        method: 'GET',
        headers: { transactionId: generateTransactionId() },
      },
    );
  } catch (error) {
    await handleApiError(error);
  }
}
// Định nghĩa kiểu dữ liệu trả về từ API
