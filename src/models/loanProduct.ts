import {
  activedLoanProductApi,
  createLoanProduct,
  deleteLoanProduct,
  fetchLoanProducts,
  getDetailLoanProduct,
} from '@/services/LoanProduct/loanProduct';
import { LoanProductRp } from '@/types/LoanProductModel';
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
    *fetchLoanProducts({ payload }, { call, put }): Generator<any, void, any> {
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
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu sản phẩm vay:', error);
      }
    },

    *createNewLoanProduct(
      { payload, callback },
      { call },
    ): Generator<any, void, any> {
      try {
        yield call(createLoanProduct, payload);
        console.log('Tạo sản phẩm vay thành công!');
        if (callback) callback(); // Gọi callback sau khi tạo thành công
      } catch (error) {
        console.error('Lỗi khi tạo sản phẩm vay:', error);
      }
    },

    *deleteLoanProductById(
      { payload },
      { call, put },
    ): Generator<any, void, any> {
      try {
        yield call(deleteLoanProduct, payload.id);
        yield put({
          type: 'removeLoanProduct',
          payload: { productId: payload.id },
        });
        console.log('Xóa sản phẩm vay thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm vay:', error);
      }
    },

    *getLoanProductById({ payload }, { call }): Generator<any, void, any> {
      try {
        const response = yield call(getDetailLoanProduct, payload.id);
        console.log(response?.data);
        if (payload.callback) {
          payload.callback(response?.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm vay:', error);
      }
    },
    *activedLoanProduct(
      { payload },
      { call, put, select },
    ): Generator<any, void, any> {
      try {
        const { id, callback, isUnActive } = payload;
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
        } else if (callback) {
          callback();
        }
      } catch (error) {
        console.error('Lỗi khi kích hoạt sản phẩm vay:', error);
      }
    },
  },
};

export default useLoanProduct;
