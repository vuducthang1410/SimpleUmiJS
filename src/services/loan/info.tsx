import {
  BaseResponse,
  EarlyFeeRepaymentLoanResponse,
  LoanInfoApproveRq,
  LoanInfoHistoryRq,
  LoanInfoPaymentScheduleResponse,
  LoanRegisterInfo,
  PaymentScheduleResponse,
} from '@/types/LoanInfo';
import { handleApiError } from '@/utils/error';
import request from '@/utils/request';
import generateTransactionId from '@/utils/Transaction';
import APIConfig from '@/utils/URL';

export const getLoanApplicants = async (
  pageNumber: number,
  loanStatus: string,
  pageSize: number = 12,
) => {
  try {
    const response = await request(
      APIConfig.LOAN_URL + '/loan-detail-info/get-all-by-loan-status',
      {
        method: 'GET',
        params: {
          loanStatus: loanStatus,
          pageNumber,
          pageSize,
        },
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
      },
    );
    return response;
  } catch (error) {
    await handleApiError(error);
  }
};

export const updateLoanDisbursementStatus = async (
  loanDetailInfoId: string,
  requestStatus: 'APPROVED' | 'REJECTED',
  note: string,
) => {
  try {
    const response = await request(
      APIConfig.LOAN_URL +
        '/loan-detail-info/individual-customer/approve-disbursement',
      {
        method: 'PATCH',
        headers: {
          transactionId: generateTransactionId(),
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        data: {
          loanDetailInfoId,
          requestStatus,
          note,
        },
      },
    );
    return response;
  } catch (error) {
    await handleApiError(error)
  }
};
export async function registerLoanInfo(loanRegisterInfo: LoanRegisterInfo) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL +
        '/loan-detail-info/individual-customer/register-loan',
      {
        method: 'POST',
        data: loanRegisterInfo,
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
export async function approvedLoanInfo(loanInfoApproveRq: LoanInfoApproveRq) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL +
        '/loan-detail-info/individual-customer/approve-disbursement',
      {
        method: 'PATCH',
        data: loanInfoApproveRq,
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
export async function getLoanInfoHistoryByCifCode(
  LoanInfoHistoryRq: LoanInfoHistoryRq,
) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL + '/loan-detail-info/get-all-loan-info-by-cif-code',
      {
        method: 'GET',
        params: LoanInfoHistoryRq,
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
export async function getLoanInfoActiveByCifCode(
  pageSize: number,
  pageNumber: number,
  cifCode: string,
) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL + '/loan-detail-info/get-all-loan-active',
      {
        method: 'GET',
        params: {
          cifCode: cifCode,
          pageNumber: pageNumber,
          pageSize: pageSize,
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
export async function getEarlyFeeRepaymentLoan(loanInfoId: string) {
  try {
    return await request<EarlyFeeRepaymentLoanResponse>(
      APIConfig.LOAN_URL +
        `/loan-detail-info/get-early-payment-penalty-fee/${loanInfoId}`,
      {
        method: 'GET',
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
export async function earlyRepaymentLoan(loanInfoId: string) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL + `/loan-detail-info/early-payment-loan/${loanInfoId}`,
      {
        method: 'PUT',
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
export async function getPaymentScheduleByLoanDetailInfo(loanInfoId: string) {
  try {
    return await request<PaymentScheduleResponse>(
      APIConfig.LOAN_URL +
        `/payment-schedule/get-list-payment-schedule/${loanInfoId}`,
      {
        method: 'GET',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
        params: {
          pageSize: 36,
          pageNumber: 0,
        },
      },
    );
  } catch (error) {
    await handleApiError(error)
  }
}
export async function repaymentLoanPeriodTermByPaymentScheduleId(
  paymentScheduleId: string,
  paymentType: string,
) {
  try {
    return await request<BaseResponse>(
      APIConfig.LOAN_URL + `/payment-schedule/repayment-deft-periodically`,
      {
        method: 'PATCH',
        headers: {
          accept: '*/*',
          transactionId: generateTransactionId(),
        },
        data: {
          paymentScheduleId: paymentScheduleId,
          paymentType: paymentType,
        },
      },
    );
  } catch (error) {
    await handleApiError(error)
  }
}
export async function getLoanPeriodTermAfterRepayment(
  loanDetailInfoId: string,
  paymentType: string,
) {
  try {
    return await request<LoanInfoPaymentScheduleResponse>(
      APIConfig.LOAN_URL + `/loan-detail-info/${loanDetailInfoId}`,
      {
        method: 'GET',
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
