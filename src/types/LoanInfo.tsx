export interface LoanRegisterInfo {
    loanProductId: string,
    formDeftRepayment: string,
    loanAmount: number,
    loanTerm: number,
    loanUnit: string,
    cifCode: string
}

export interface BaseResponse {
    data: string,
    message: string,
    status: string
}
export interface LoanApplicant {
    fullName: string;
    formDeftRepayment: string;
    identityCard: string;
    loanDetailInfoId: string;
    interestRate: number;
    loanAmount: string;
    loanTerm: number;
    phone: string;
    unit: string;
    createdTime: string;
    loanStatus: string;
    loanProductName: string;
}
export interface LoanInfoApproveRq {
    loanDetailInfoId: string,
    requestStatus: string,
    note: string
}