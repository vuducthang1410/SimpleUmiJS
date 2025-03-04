import { getInfoFinancialInfoByCifCode } from '@/services/financialInfo/financialInfo';
import { API } from '@/types/financialInfo';
import { Effect } from '@umijs/max';

export interface FinacialInfo {
  financialInfo: API.FinancialInfoItem | null;
  loading: boolean;
}

export interface RootState {
  fetchFinancialInfo: FinacialInfo;
}

export interface FinancialInfoModel {
  namespace: 'financialInfo';
  state: RootState;
  reducers: {};
  effects: { getFinancialInfoByCifCode: Effect };
}

const useFinancialInfo: FinancialInfoModel = {
  namespace: 'financialInfo',
  state: {
    fetchFinancialInfo: {
      financialInfo: null,
      loading: false,
    },
  },
  reducers: {},
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
      } catch (error) {}
    },
  },
};

export default useFinancialInfo;
