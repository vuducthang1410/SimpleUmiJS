import { registerLoanInfo } from '@/services/loan/info';
import { Effect, Reducer } from '@umijs/max';

export interface LoanDetailInfo {
  loading: boolean;
}
export interface RootState {
  fetchLoanDetailInfo: LoanDetailInfo;
}

export interface LoanDetailInfoModel {
  namespace: 'loanDetailInfo';
  state: RootState;
  reducers: { setLoading: Reducer };
  effects: { registerLoanInfo: Effect };
}
const useLoanDetailInfo: LoanDetailInfoModel = {
  namespace: 'loanDetailInfo',
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
    *registerLoanInfo(
      { payload },
      { call, put, select },
    ): Generator<any, void, any> {
      console.log('bnbbb');

      try {
        yield put({ type: 'setLoading', payload: true });
        const response = yield call(registerLoanInfo, payload.loanDetailInfo);
        payload.callbackPushNoti(response.message, true);
      } catch (error) {
        if (error instanceof Error) {
          payload.callbackPushNoti(error.message, true);
        }
      } finally {
        yield put({ type: 'setLoading', payload: false });
        payload.callbackSetStatusModal(false);
      }
    },
  },
};

export default useLoanDetailInfo;
