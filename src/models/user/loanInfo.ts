import {
  earlyRepaymentLoan,
  getEarlyFeeRepaymentLoan,
  getLoanInfoActiveByCifCode,
  getLoanInfoHistoryByCifCode,
  getLoanPeriodTermAfterRepayment,
  getPaymentScheduleByLoanDetailInfo,
  registerLoanInfo,
  repaymentLoanPeriodTermByPaymentScheduleId,
} from '@/services/loan/info';
import { LoanDetailActiveRp, LoanInfoHistory, PaymentScheduleRp } from '@/types/LoanInfo';
import { getErrorData } from '@/utils/error';
import { Effect, Reducer } from '@umijs/max';

export interface LoanDetailInfo {
  loading: boolean;
  loanDetailInfo: LoanDetailActiveRp;
  paymentScheduleList: PaymentScheduleRp[];
  loanDetailInfoList: LoanDetailActiveRp[];
  totalRecord: number;
  loanInfoHistory: LoanInfoHistory[]
  filteredData: number
}
export interface RootState {
  fetchLoanDetailInfo: LoanDetailInfo;
}

export interface LoanDetailInfoModel {
  namespace: 'loanDetailInfo';
  state: RootState;
  reducers: {
    setLoading: Reducer;
    updateLoanDetailInfo: Reducer<RootState>;
    updateLoanAmountRemaing: Reducer;
    updatePaymentScheduleList: Reducer;
    updateLoanDetailInfoList: Reducer;
    updateLoanAmountRemaingInList: Reducer;
    updateLoanDetailInfoListAfterRepaymentLoan: Reducer;
    setTotalRecord: Reducer;
    setLoanInfoHistory: Reducer<RootState>;
  };
  effects: {
    registerLoanInfo: Effect;
    getLoanInfoHistoryByCifCode: Effect;
    getLoanInfoActiveByCifCode: Effect;
    getEarlyFeeRepaymentLoan: Effect;
    earlyRepaymentLoan: Effect;
    getPaymentScheduleByLoanDetailInfo: Effect;
    repaymentSchedulePeriodTerm: Effect;
    getLoanPeriodTermAfterRepayment: Effect;
  };
}
const useLoanDetailInfo: LoanDetailInfoModel = {
  namespace: 'loanDetailInfo',
  state: {
    fetchLoanDetailInfo: {
      loading: false,
      loanDetailInfo: {
        dueDate: '',
        nextRepaymentDate: '',
        loanDate: '',
        loanAmount: '0',
        loanAmountRemaining: '0',
        nextLoanAmountRepayment: '0',
        loanProductName: 'N/A',
        loanTermName: 'N/A',
        loanTerm: 0,
        loanInfoId: '',

      },
      paymentScheduleList: [],
      loanDetailInfoList: [],
      totalRecord: 0,
      loanInfoHistory: [], filteredData: 0
    },
  },
  reducers: {
    setLoading(state, action) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loading: action.payload,
        },
      };
    },
    setTotalRecord(state, action) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          totalRecord: action.payload,
        },
      };
    },
    updateLoanDetailInfo(state, { payload }) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loanDetailInfo: { ...payload },
        },
      };
    },
    updateLoanAmountRemaing(state, { payload }) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loanDetailInfo: {
            ...state.fetchLoanDetailInfo.loanDetailInfo,
            loanAmountRemaining: payload, // Cập nhật giá trị mới
          },
        },
      };
    },
    updatePaymentScheduleList(state, { payload }) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          paymentScheduleList: payload, // Gán danh sách mới vào state
        },
      };
    },
    updateLoanDetailInfoList(state, { payload }) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loanDetailInfoList: payload, // Gán danh sách mới vào state
        },
      };
    },
    updateLoanAmountRemaingInList(state, { payload }) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loanDetailInfoList: state.fetchLoanDetailInfo.loanDetailInfoList.map(
            (item: LoanDetailActiveRp) =>
              item.loanInfoId === payload.loanDetailInfoId
                ? { ...item, loanAmountRemaining: payload.loanAmountRemaining }
                : item,
          ),
        },
      };
    },

    updateLoanDetailInfoListAfterRepaymentLoan(state, { payload }) {
      return {
        ...state,
        fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loanDetailInfoList: state.fetchLoanDetailInfo.loanDetailInfoList
            ? state.fetchLoanDetailInfo.loanDetailInfoList.filter(
              (item: LoanDetailActiveRp) =>
                item.loanInfoId !== payload.loanDetailInfoId,
            )
            : [],
        },
      };
    },
    setLoanInfoHistory(state, { payload }) {
      return {
        ...state, fetchLoanDetailInfo: {
          ...state.fetchLoanDetailInfo,
          loanInfoHistory: payload.loanInfoHistory,
          filteredData: payload.loanInfoHistory.length
        }
      }
    }
  },

  effects: {
    *registerLoanInfo(
      { payload, callback },
      { call, put, select },
    ): Generator<any, void, any> {
      try {
        yield put({ type: 'setLoading', payload: true });
        const response = yield call(registerLoanInfo, payload.loanDetailInfo);
        callback({ isSuccess: true, message: response.message })
      } catch (error: any) {
        if (error instanceof Error) {
          const errorData = getErrorData(error.message)
          Array.isArray(errorData?.data) ?
            callback({ isSuccess: false, message: errorData?.data[0] }) :
            callback({ isSuccess: false, message: errorData?.data })
        } else {
          console.log("🟡 Error is not an instance of Error, raw value:", error);
          callback({ isSuccess: false, message: "Lỗi không xác định. Vui lòng thử lại!" });
        }
      }
      finally {
        yield put({ type: 'setLoading', payload: false });
        payload.callbackSetStatusModal(false);
      }
    },
    *getLoanInfoHistoryByCifCode(
      { payload, callback },
      { call, put, select },
    ): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      try {
        const response = yield call(
          getLoanInfoHistoryByCifCode,
          payload.loanInfoHistoryRq,
        );
        yield put({
          type: 'setLoanInfoHistory', payload: {
            loanInfoHistory: response.data.loanDetailInfoRpList
          }
        })
        yield put({ type: 'setLoading', payload: false });
        callback({ isSuccess: true, message: "" })
      } catch (error: any) {
        if (error instanceof Error) {
          const errorData = getErrorData(error.message)
          Array.isArray(errorData?.data) ?
            callback({ isSuccess: false, message: errorData?.data[0] }) :
            callback({ isSuccess: false, message: errorData?.data })
        } else {
          console.log("🟡 Error is not an instance of Error, raw value:", error);
          callback({ isSuccess: false, message: "Lỗi không xác định. Vui lòng thử lại!" });
        }
        yield put({ type: 'setLoading', payload: false });
      }
    },
    *getLoanInfoActiveByCifCode(
      { payload, callback },
      { call, put ,select},
    ): Generator<any, void, any> { 
      // yield put({ type: 'setLoading', payload: true });
      const data=yield select((state:any)=>state.loanDetailInfo)
      console.log(data)
      try {
        const response = yield call(
          getLoanInfoActiveByCifCode,
          payload.pageSize,
          payload.pageNumber,
          payload.cifCode,
        );
        if (response && response.data) {
          yield put({
            type: 'updateLoanDetailInfoList',
            payload: response.data.loanDetailInfoRpList,
          });
          yield put({
            type: 'setTotalRecord',
            payload: response.data.totalRecord,
          });
        }
        callback({ isSuccess: true, message: response.message })
        const data1=yield select((state:any)=>state.loanDetailInfo)
        console.log(data1)
        yield put({ type: 'setLoading', payload: false });
        const data2=yield select((state:any)=>state.loanDetailInfo)
        console.log(data2)
      } catch (error: any) {
        if (error instanceof Error) {
          const errorData = getErrorData(error.message)
          Array.isArray(errorData?.data) ?
            callback({ isSuccess: false, message: errorData?.data[0] }) :
            callback({ isSuccess: false, message: errorData?.data })
        } else {
          console.log("🟡 Error is not an instance of Error, raw value:", error);
          callback({ isSuccess: false, message: "Lỗi không xác định. Vui lòng thử lại!" });
        }
        yield put({ type: 'setLoading', payload: false });
      }
    },
    *getEarlyFeeRepaymentLoan(
      { payload, callback },
      { call },
    ): Generator<any, void, any> {
      try {
        const response = yield call(
          getEarlyFeeRepaymentLoan,
          payload.loanInfoId,
        );
        callback(response);
      } catch (error) {
        console.log(error);
      }
    },
    *earlyRepaymentLoan(
      { payload, callback },
      { call, put, select },
    ): Generator<any, void, any> {
      const data=yield select((state:any)=>state.loanDetailInfo)
      console.log(data)
      yield put({ type: 'setLoading', payload: true });
      const data1=yield select((state:any)=>state.loanDetailInfo)
      console.log(data1)
      try {
        const response = yield call(earlyRepaymentLoan, payload.loanInfoId);
        yield put({
          type: 'getLoanInfoActiveByCifCode',
          payload: {
            pageSize: payload.pageSize,
            pageNumber: payload.currentPage - 1,
            cifCode: payload.cifCode,
          },
        });
        callback({ isSuccess: true, message: response.message })
        const data2=yield select((state:any)=>state.loanDetailInfo)
        console.log(data2)
        yield put({ type: 'setLoading', payload: false });
        const data3=yield select((state:any)=>state.loanDetailInfo)
        console.log(data3)
        console.log("heheeh")
      } catch (error: any) {
        if (error instanceof Error) {
          const errorData = getErrorData(error.message)
          Array.isArray(errorData?.data) ?
            callback({ isSuccess: false, message: errorData?.data[0] }) :
            callback({ isSuccess: false, message: errorData?.data })
        } else {
          console.log("🟡 Error is not an instance of Error, raw value:", error);
          callback({ isSuccess: false, message: "Lỗi không xác định. Vui lòng thử lại!" });
        }
        yield put({ type: 'setLoading', payload: false });
      } finally {
        yield put({ type: 'setLoading', payload: false }); 
      }
    },
    *getPaymentScheduleByLoanDetailInfo(
      { payload, callback },
      { call, put },
    ): Generator<any, void, any> {
      try {
        const response = yield call(
          getPaymentScheduleByLoanDetailInfo,
          payload.loanInfoId,
        );
        yield put({
          type: 'updatePaymentScheduleList',
          payload: response.data.listPaymentSchedule,
        });
      } catch (error) {
        callback(null);
      }
    },
    *repaymentSchedulePeriodTerm(
      { payload, callback },
      { call, put },
    ): Generator<any, void, any> {
      try {
        const response = yield call(
          repaymentLoanPeriodTermByPaymentScheduleId,
          payload.paymentScheduleId,
          payload.paymentType,
        );
        callback(response);
        yield put({
          type: 'getLoanPeriodTermAfterRepayment',
          payload: { loanDetailInfoId: payload.loanDetailInfoId },
        });
      } catch (error) {
        callback(error);
        console.log(error);
      }
    },
    *getLoanPeriodTermAfterRepayment(
      { payload },
      { call, put },
    ): Generator<any, void, any> {
      const response = yield call(
        getLoanPeriodTermAfterRepayment,
        payload.loanDetailInfoId,
      );
      yield put({
        type: 'updateLoanAmountRemaing',
        payload: response.data.amountLoanRemaining,
      });
      yield put({
        type: 'updatePaymentScheduleList',
        payload: response.data.paymentScheduleRpList,
      });
      yield put({
        type: 'updateLoanAmountRemaingInList',
        payload: {
          loanAmountRemaining: response.data.amountLoanRemaining,
          loanDetailInfoId: payload.loanDetailInfoId,
        },
      });
    },
  },
};

export default useLoanDetailInfo;
