import { BaseResponseHistoryTransaction, TransactionRequest } from '@/types/Transaction';
import { AccountData, ApiResponse } from '@/types/User';
import { handleApiError } from '@/utils/error';
import request from '@/utils/request';
import generateTransactionId from '@/utils/Transaction';
import APIConfig from '@/utils/URL';

export const getTransactionHistory = async (
    pageNumber: number,
    accountBankingNumber: string,
    pageSize: number = 12,
) => {
    try {
        const response = await request<BaseResponseHistoryTransaction>(
            APIConfig.TRANSACTION_URL + '/transactions/get-transaction-by-account-banking-number',
            {
                method: 'GET',
                params: {
                    accountBankingNumber: accountBankingNumber,
                    page: pageNumber,
                    limit: pageSize,
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
export const getInfoAccountByAccountNumber = async (
    accountBankingNumber: string,
) => {
    try {
        const response = await request<ApiResponse<AccountData>>(
            APIConfig.ACCOUNT_URL + `/accounts/banking/get-detail/${accountBankingNumber}`,
            {
                method: 'GET',
                params: {
                    accountBankingNumber: accountBankingNumber,
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
export const executeTransactionInternal = async (
    transactionData: TransactionRequest
) => {
    console.log(transactionData)
    try {
        const response = await request<BaseResponseHistoryTransaction>(
            APIConfig.TRANSACTION_URL + '/transactions/internal',
            {
                method: 'POST',
                data: transactionData,
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
export const confirmTransactionInternal = async (
    otp: string,
    transactionId: string
) => {
    try {
        const response = await request<BaseResponseHistoryTransaction>(
            APIConfig.TRANSACTION_URL + `/transactions/internal/${transactionId}/confirm`,
            {
                method: 'PUT',
                params: { otp: otp },
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