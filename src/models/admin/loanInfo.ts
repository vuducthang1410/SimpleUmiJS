import { approvedLoanInfo } from '@/services/loan/info';
import { getErrorData } from '@/utils/error';
import { Effect, Reducer } from '@umijs/max';

export interface LoanDetailInfoCms {
  loading: boolean;
}
export interface RootState {
  fetchLoanDetailInfo: LoanDetailInfoCms;
}

export interface LoanDetailInfoCmsModel {
  namespace: 'loanDetailInfoCms';
  state: RootState;
  reducers: { setLoading: Reducer };
  effects: { approvedLoanInfo: Effect };
}
const useLoanDetailInfo: LoanDetailInfoCmsModel = {
  namespace: 'loanDetailInfoCms',
  state: {
    fetchLoanDetailInfo: {
      loading: false,
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
  },

  effects: {
    *approvedLoanInfo({ payload, callback }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      try {
        console.log('first', payload.loanInfoApproveRq);
        const response = yield call(
          approvedLoanInfo,
          payload.loanInfoApproveRq,
        );
        payload.cbLoadData();
        yield put({ type: 'setLoading', payload: false });
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
    },
  },
};

export default useLoanDetailInfo;
