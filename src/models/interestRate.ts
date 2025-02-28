import {
  APIResponseInterestRate,
  createInterestRate,
  getInterestRateByLoanProductId,
} from '@/services/interestRate/interestRate';
import { InterestRate } from '@/types/InterestRate';
import { Effect, Reducer } from '@umijs/max';

export interface InterestRateState {
  interestRateList: InterestRate[];
  totalRecords: number;
}

export interface InterestRateModel {
  namespace: 'interestRate';
  state: InterestRateState;
  reducers: {
    setInterestRates: Reducer<InterestRateState>;
  };
  effects: {
    fetchInterestRates: Effect;
    createNewInterestRate: Effect;
  };
}

const useInterestRate: InterestRateModel = {
  namespace: 'interestRate',

  state: {
    interestRateList: [],
    totalRecords: 0,
  },

  reducers: {
    setInterestRates(state, action) {
      return {
        ...state,
        interestRateList: action.payload?.interestRateList || [],
        totalRecords: action.payload?.totalRecord || 0,
      };
    },
  },

  effects: {
    *fetchInterestRates({ payload }, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(
          getInterestRateByLoanProductId,
          payload.loanProductId,
          payload.pageNumber,
          payload.pageSize,
        );
        if (response?.data) {
          yield put({
            type: 'setInterestRates',
            payload: response.data,
          });
        } else {
          console.warn('Không có dữ liệu lãi suất.');
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu lãi suất:', error);
      }
    },

    *createNewInterestRate({ payload }, { call, put }) {
      console.log('first');
      try {
        const response: APIResponseInterestRate = yield call(
          createInterestRate,
          payload.data,
        );
        if (payload.updateCallback) {
          payload.updateCallback();
        }
        console.log('Thêm mới lãi xuất thành công');
      } catch (error) {
        if (error instanceof Error) {
          payload.callback('Error: ' + error.message);
        } else {
          payload.callback('Lỗi không xác định. Vui lòng thử lại!');
        }
      }
    },
  },
};

export default useInterestRate;
