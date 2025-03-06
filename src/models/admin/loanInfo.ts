import { approvedLoanInfo } from '@/services/loan/info';
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
    *approvedLoanInfo({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      try {
        console.log('first', payload.loanInfoApproveRq);
        const response = yield call(
          approvedLoanInfo,
          payload.loanInfoApproveRq,
        );
        payload.cbLoadData();
        yield put({ type: 'setLoading', payload: false });
        payload.cbPushNoti('Xét duyệt thành công!!', true);
      } catch (error) {
        payload.cbPushNoti(error.message, false);
        yield put({ type: 'setLoading', payload: true });
      }
    },
  },
};

export default useLoanDetailInfo;
