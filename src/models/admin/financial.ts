import { fetchFinancialInfo, getInfoFinancialInfoByCifCode } from "@/services/financialInfo/financialInfo";
import { API, FinancialDetail } from "@/types/financialInfo";
import { Effect, Reducer } from "@umijs/max";
export interface FinancialInfoState {
  list: API.FinancialInfoItem[];
  totalRecords: number;
  isLoading: boolean
}
export interface FinancialInfoModel {
  namespace: 'financialInfoAdmin',
  state: FinancialInfoState

  reducer: {
    setState: Reducer<FinancialInfoState>;
  },
  effects: {
    fetchList: Effect;
    approvedFinancilRequest: Effect;
  }
}
const useFinancialInfo: FinancialInfoModel = {
  namespace: 'financialInfoAdmin',
  state: {
    list: [], totalRecords: 0, isLoading: false,
  },
  reducer: {
    setState(state, action) {
      return { ...state, list: action.listFinancialInfo, totalRecords: action.payload.totalRecords }
    },
  },
  effects: {
    *fetchList({ payload }, { call, put }): Generator<any, void, any> {
      try {
        console.log("bbbb")
        const response = yield call(fetchFinancialInfo, payload.status);
        console.log('Dữ liệu trả về từ API:', response);
        yield put({
          type: 'setList', payload: {
            listFinancialInfo: response.data.financialInfoRpList,
            totalRecords: response.data.totalRecords
          }
        })
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tài chính:', error);
      }
    },
    *approvedFinancilRequest({ payload }, { call, put }): Generator<any, void, any> {
      console.log("first")
    }
  }
}
export default useFinancialInfo;