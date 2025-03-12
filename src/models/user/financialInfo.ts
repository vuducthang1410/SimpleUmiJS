import { getDetailFinancialInfoByCifCode, getInfoFinancialInfoByCifCode } from '@/services/financialInfo/financialInfo';
import { API, FinancialDetail } from '@/types/financialInfo';
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
            ...state.fetchFinancialInfo.financialInfoDetail, // Tạo object mới để Redux nhận diện thay đổi
            ...payload.financialInfo, // Gán toàn bộ dữ liệu từ API
          }
        }
      };
    }
  },
  effects: {
    *getFinancialInfoByCifCode(
      { payload },
      { call },
    ): Generator<any, void, any> {
      try {
        const response = yield call(
          getInfoFinancialInfoByCifCode,
          payload.cifCode,
        );
        console.log('heheh', response);
        payload.callback(response.data);
      } catch (error) { }
    },
    *fetchFinancialInfo({ payload }, { call, put,select }): Generator<any, void, any> {
      try {
        console.log("first")
        const response = yield call(getDetailFinancialInfoByCifCode, payload?.cifCode || '');
        yield put({
          type: 'setFinancialInfo', payload: {
            financialInfo: response.data
          }
        })
        const data=yield select((state:any)=>state.financialInfo)
        console.log("rhhr",data)
      } catch (error) {

      }
    }
  },
};

export default useFinancialInfo;
