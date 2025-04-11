import { getDetailFinancialInfoByCifCode, getDetailStatisticalByCifCode, getInfoFinancialInfoByCifCode, registerFInancialInfo } from '@/services/financialInfo/financialInfo';
import { API, FinancialDetail } from '@/types/financialInfo';
import { getErrorData } from '@/utils/error';
import { Effect, Reducer } from '@umijs/max';

export interface FinacialInfo {
  financialInfo: API.FinancialInfoItem | null;
  loading: boolean;
  financialInfoDetail: FinancialDetail;
}

export interface RootState {
  fetchFinancialInfo: FinacialInfo;
}

export interface FinancialInfoModel {
  namespace: 'financialInfo';
  state: RootState;
  reducers: {
    setFinancialInfo: Reducer<RootState>;
  };
  effects: {
    getFinancialInfoByCifCode: Effect,
    fetchFinancialInfo: Effect;
    registerFinnancialInfo: Effect,
    getDetailStatisticalByCifCode: Effect
  };
}

const useFinancialInfo: FinancialInfoModel = {
  namespace: 'financialInfo',
  state: {
    fetchFinancialInfo: {
      financialInfo: null,
      loading: false,
      financialInfoDetail: {}
    },
  },
  reducers: {
    setFinancialInfo(state, { payload }) {
      return {
        ...state,
        fetchFinancialInfo: {
          ...state.fetchFinancialInfo,
          financialInfoDetail: {
            ...state.fetchFinancialInfo.financialInfoDetail,
            ...payload.financialInfo,
          }
        }
      };
    }
  },
  effects: {
    *getFinancialInfoByCifCode(
      { payload, callback },
      { call },
    ): Generator<any, void, any> {
      try {
        const response = yield call(
          getInfoFinancialInfoByCifCode,
          payload.cifCode,
        );
        console.log('heheh', response);
        payload.callback(response.data);
      } catch (error) {
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
    *fetchFinancialInfo({ payload, callback }, { call, put, select }): Generator<any, void, any> {
      try {
        const response = yield call(getDetailFinancialInfoByCifCode, payload?.cifCode || '');
        console.log(response)
        yield put({
          type: 'setFinancialInfo', payload: {
            financialInfo: response.data
          }
        })
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
    }
    ,
    *registerFinnancialInfo({ payload, callback }, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(registerFInancialInfo, payload.formData);
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
    *getDetailStatisticalByCifCode({payload,callback},{call}):Generator<any,void,any>{
      try {
        const response = yield call(getDetailStatisticalByCifCode, payload.cifCode);
        payload.cbUpdate(response.data)
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
    }
  },
};

export default useFinancialInfo;
