import {
  APIResponseInterestRate,
  createInterestRate,
  getInterestRateByLoanProductId,
} from '@/services/interestRate/interestRate';
import { InterestRate } from '@/types/InterestRate';
import { getErrorData } from '@/utils/error';
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

    *createNewInterestRate({ payload, callback }, { call, put }) {
      try {
        const response: APIResponseInterestRate = yield call(
          createInterestRate,
          payload.data,
        );
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

export default useInterestRate;
