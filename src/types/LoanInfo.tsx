export interface LoanRegisterInfo {
    loanProductId: string;
    formDeftRepayment: string;
    loanAmount: number;
    loanTerm: number;
    loanUnit: string;
    cifCode: string;
}

export interface BaseResponse {
    data: string[];
    message: string;
    status: string;
}
export interface LoanInfoPaymentScheduleResponse {
    data: {
        amountLoanRemaining: string,
        paymentScheduleRpList: PaymentScheduleRp[]
    };
    message: string;
    status: string;
}
export interface PaymentScheduleResponse {
    data: PaymentScheduleRp[];
    message: string;
    status: string;
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
    loanDetailInfoId: string;
    requestStatus: string;
    note: string;
}
export interface LoanInfoHistory {
    loanDetailInfoId: string;
    createdDate: string;
    interestRate: number;
    loanAmount: string;
    loanProductName: string;
    loanTerm: number;
    requestStatus:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'EXPIRED'
    | 'CANCEL'
    | 'ALL';
    loanStatus: string;
}
export interface LoanInfoHistoryRq {
    pageNumber: number;
    pageSize: number;
    requestStatus: string
    cifCode: string;
}
export interface LoanDetailActiveRp {
    dueDate: string;
    nextRepaymentDate: string;
    loanDate: string;
    loanAmount: string;
    loanAmountRemaining: string;
    nextLoanAmountRepayment: string;
    loanProductName: string;
    loanTermName: string;
    loanTerm: number;
    loanInfoId: string
}
export interface LoanDetailInfoRp {
    createdDate: string;
    dateDisbursement: string;
    douDate: string;
    interestRate: number;
    loanAmount: string;
    loanDetailInfoId: string;
    loanProductName: string;
    loanTerm: number;
    unit: string;
    loanStatus: string;
}

export interface LoanDataRp {
    loanDetailInfo: LoanDetailInfoRp;
    amountRemainingLoan: number;
    interestCurrentPeriod: number;
    amountNeedPayment: number;
    amountFined: string;
}
export interface EarlyFeeRepaymentLoanResponse {
    data: LoanDataRp;
    message: string;
    status: string;
}
export interface PaymentScheduleRp {
    paymentScheduleId: string;
    nameSchedule: string;
    dueDate: string;
    amountRemaining: string;
    status: string;
    isPaid: boolean;
}
export enum PaymentType {
    PRINCIPAL = "PRINCIPAL",
    INTEREST = "INTEREST",
    PENALTY = "PENALTY",
    ALL = "ALL",
    AUTO_REPAYMENT = "AUTO_REPAYMENT",
}
