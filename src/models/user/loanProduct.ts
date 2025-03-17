import getLoanProductForUser, {
  getListLoanProductForUser,
} from '@/services/LoanProduct/loanProduct';
import { LoanProductForUserRp } from '@/types/LoanProduct';
import { getErrorData } from '@/utils/error';
import { Effect, Reducer } from '@umijs/max';

export interface LoanProductState {
  loanProductList: LoanProductForUserRp[];
  totalRecords: number;
  loading: boolean;
}
export interface RootState {
  loanProduct: LoanProductState;
}

export interface LoanProductModel {
  namespace: 'loanProductForUser';
  state: LoanProductState;
  reducers: {
    setLoanProducts: Reducer<LoanProductState>;
    removeLoanProduct: Reducer<LoanProductState>;
    setLoading: Reducer<LoanProductState>;
  };
  effects: {
    fetchLoanProducts: Effect;
    getLoanProductById: Effect;
  };
}

const useLoanProduct: LoanProductModel = {
  namespace: 'loanProductForUser',

  state: {
    loanProductList: [],
    totalRecords: 0,
    loading: false,
  },

  reducers: {
    setLoanProducts(state, action) {
      return {
        ...state,
        loanProductList: action.payload?.loanProductForUserRpList || [],
        totalRecords: action.payload?.totalRecords || 0,
      };
    },
    removeLoanProduct(state, action) {
      return {
        ...state,
        loanProductList: state.loanProductList.filter(
          (product) => product.loanProductId !== action.payload.productId,
        ),
      };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },

  effects: {
    *fetchLoanProducts({ payload, callback }, { call, put }): Generator<any, void, any> {
      try {
        console.log("first")
        yield put({ type: 'setLoading', payload: true });
        const response = yield call(
          getListLoanProductForUser,
          payload.pageSize,
          payload.pageNum,
        );
        console.log('reponse', response);
        if (response?.data) {
          yield put({
            type: 'setLoanProducts',
            payload: response.data,
          });
        } else {
          console.warn('Không có dữ liệu sản phẩm vay.');
        }
        yield put({ type: 'setLoading', payload: false });
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

    *getLoanProductById({ payload, callback }, { call }): Generator<any, void, any> {
      console.log("first")
      try {
        const response = yield call(getLoanProductForUser, payload.id);
        console.log(response)
        payload.callback(response.data)
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

export default useLoanProduct;
