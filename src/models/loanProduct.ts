import {
  activedLoanProductApi,
  createLoanProduct,
  deleteLoanProduct,
  fetchLoanProducts,
  getDetailLoanProduct,
} from '@/services/LoanProduct/loanProduct';
import { LoanProductRp } from '@/types/LoanProduct';
import { getErrorData } from '@/utils/error';
import { Effect, Reducer } from '@umijs/max';

export interface LoanProductState {
  loanProductList: LoanProductRp[];
  totalRecords: number;
}
export interface RootState {
  loanProduct: LoanProductState;
}

export interface LoanProductModel {
  namespace: 'loanProduct';
  state: LoanProductState;
  reducers: {
    setLoanProducts: Reducer<LoanProductState>;
    removeLoanProduct: Reducer<LoanProductState>;
  };
  effects: {
    fetchLoanProducts: Effect;
    createNewLoanProduct: Effect;
    deleteLoanProductById: Effect;
    getLoanProductById: Effect;
    activedLoanProduct: Effect;
  };
}

const useLoanProduct: LoanProductModel = {
  namespace: 'loanProduct',

  state: {
    loanProductList: [],
    totalRecords: 0,
  },

  reducers: {
    setLoanProducts(state, action) {
      return {
        ...state,
        loanProductList: action.payload?.loanProductRpList || [],
        totalRecords: action.payload?.totalRecords || 0,
      };
    },
    removeLoanProduct(state, action) {
      return {
        ...state,
        loanProductList: state.loanProductList.filter(
          (product) => product.productId !== action.payload.productId,
        ),
      };
    },
  },

  effects: {
    *fetchLoanProducts({ payload, callback }, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(
          fetchLoanProducts,
          payload.active,
          payload.pageNumber,
          payload.pageSize,
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

    *createNewLoanProduct(
      { payload, callback },
      { call },
    ): Generator<any, void, any> {
      try {
        const response = yield call(createLoanProduct, payload);
        console.log('Tạo sản phẩm vay thành công!');
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

    *deleteLoanProductById(
      { payload, callback },
      { call, put },
    ): Generator<any, void, any> {
      try {
        const response = yield call(deleteLoanProduct, payload.id);
        yield put({
          type: 'removeLoanProduct',
          payload: { productId: payload.id },
        });
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

    *getLoanProductById({ payload, callback }, { call }): Generator<any, void, any> {
      try {
        const response = yield call(getDetailLoanProduct, payload.id);
        console.log(response?.data);
        if (payload.callback) {
          payload.callback(response?.data);
        }
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
    *activedLoanProduct(
      { payload, callback },
      { call, put, select },
    ): Generator<any, void, any> {
      try {
        const { id, isUnActive } = payload;
        const response = yield call(activedLoanProductApi, id);
        console.log('Kích hoạt sản phẩm vay thành công:', response);

        if (isUnActive) {
          const { loanProductList, totalRecords }: LoanProductState =
            yield select((state: RootState) => state.loanProduct);

          yield put({
            type: 'setLoanProducts',
            payload: {
              loanProductRpList: loanProductList.filter(
                (product) => product.productId !== id,
              ),
              totalRecords: totalRecords > 0 ? totalRecords - 1 : 0,
            },
          });
        }
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

export default useLoanProduct;
