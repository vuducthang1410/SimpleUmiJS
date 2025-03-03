import getLoanProductForUser, {
  getListLoanProductForUser,
} from '@/services/LoanProduct/loanProduct';
import { LoanProductForUserRp } from '@/types/LoanProduct';
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
    *fetchLoanProducts({ payload }, { call, put }): Generator<any, void, any> {
      try {
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
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu sản phẩm vay:', error);
      }
    },

    *getLoanProductById({ payload }, { call }): Generator<any, void, any> {
      try {
        const response = yield call(getLoanProductForUser, payload.id);
        console.log(response?.data);
        if (payload.callback) {
          payload.callback(response?.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm vay:', error);
      }
    },
  },
};

export default useLoanProduct;
