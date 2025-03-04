import { BaseResponse, LoanInfoApproveRq, LoanRegisterInfo } from '@/types/LoanInfo';
import generateTransactionId from '@/utils/Transaction';
import getURL from '@/utils/URL';
import { request } from '@umijs/max';

export const getLoanApplicants = async (
    pageNumber: number,
    loanStatus: string,
    pageSize: number = 12,
) => {
    const response = await request(
        getURL() + '/loan-detail-info/get-all-by-loan-status',
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
};

export const updateLoanDisbursementStatus = async (
    loanDetailInfoId: string,
    requestStatus: 'APPROVED' | 'REJECTED',
    note: string,
) => {
    try {
        const response = await request(
            getURL() + '/loan-detail-info/individual-customer/approve-disbursement',
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
        throw error;
    }
};
export async function registerLoanInfo(loanRegisterInfo: LoanRegisterInfo) {
    try {
        return await request<BaseResponse>(
            getURL() + '/loan-detail-info/individual-customer/register-loan',
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
        const axiosError = error as AxiosError;
        const errorMessage =
            axiosError.response?.data?.data ||
            axiosError.message ||
            'Có lỗi xảy ra khi tạo lãi suất';

        throw new Error(errorMessage);
    }
}
export async function approvedLoanInfo(loanInfoApproveRq: LoanInfoApproveRq) {
    try {
        return await request<BaseResponse>(
            getURL() + '/loan-detail-info/individual-customer/approve-disbursement',
            {
                method: 'PATCH',
                data: loanInfoApproveRq,
                headers: {
                    accept: '*/*',
                    transactionId: generateTransactionId(),
                },
            }
        )
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage =
            axiosError.response?.data?.data ||
            axiosError.message ||
            'Có lỗi xảy ra khi tạo lãi suất';

        throw new Error(errorMessage);
    }
}
