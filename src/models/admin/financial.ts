import { approvedFinancialRequestRegister, fetchFinancialInfo, getInfoFinancialInfoByCifCode } from "@/services/financialInfo/financialInfo";
import { API} from "@/types/financialInfo";
import { getErrorData } from "@/utils/error";
import { Effect, Reducer } from "@umijs/max";
export interface FinancialInfoState {
  list: API.FinancialInfoItem[];
  totalRecords: number;
  isLoading: boolean
}
export interface FinancialInfoModel {
  namespace: 'financialInfoAdmin',
  state: FinancialInfoState

  reducers: {
    setState: Reducer<FinancialInfoState>;
  },
  effects: {
    fetchList: Effect;
    approvedFinancialRequest: Effect;
  }
}
const useFinancialInfo: FinancialInfoModel = {
  namespace: 'financialInfoAdmin',
  state: {
    list: [], totalRecords: 0, isLoading: false,
  },
  reducers: {
    setState(state, action) {
      console.log(action.payload.listFinancialInfo)
      return { ...state, list: action.payload.listFinancialInfo, totalRecords: action.payload.totalRecords }
    },
  },
  effects: {
    *fetchList({ payload, callback }, { call, put }): Generator<any, void, any> {
      try {
        console.log("bbbb")
        const response = yield call(fetchFinancialInfo, payload.status);
        console.log('Dữ liệu trả về từ API:', response.data);
        yield put({
          type: 'setState', payload: {
            listFinancialInfo: response.data.financialInfoRpList,
            totalRecords: response.data.totalRecords
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
    },
    *approvedFinancialRequest({ payload, callback }, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(approvedFinancialRequestRegister, payload.data);
        yield put({type:'fetchList',payload:{status:'PENDING'}})
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
  }
}
export default useFinancialInfo;