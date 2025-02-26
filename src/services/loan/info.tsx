import { request } from 'umi';

export const getLoanApplicants = async (pageNumber: number, loanStatus: string, pageSize: number = 12) => {
    const response = await request('http://10.3.245.23:8084/api/v1/loan-detail-info/get-all-by-loan-status', {
        method: 'GET',
        params: {
            loanStatus: loanStatus,
            pageNumber,
            pageSize,
        },
        headers: {
            accept: '*/*',
            transactionId: '123456789',
        },
    });

    return response;
};

export const updateLoanDisbursementStatus = async (
    loanDetailInfoId: string,
    requestStatus: 'APPROVED' | 'REJECTED',
    note: string
) => {
    try {
        const response = await request('http://10.3.245.23:8084/api/v1/loan-detail-info/individual-customer/approve-disbursement', {
            method: 'PATCH',
            headers: {
                'transactionId': '123456789',
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            data: {
                loanDetailInfoId,
                requestStatus,
                note,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
