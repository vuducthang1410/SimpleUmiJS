import {
  createLoanProduct,
  deleteLoanProduct,
  fetchLoanProducts,
  getDetailLoanProduct,
} from '@/services/LoanProduct/loanProduct';
import { LoanProduct, LoanProductRp } from '@/types/LoanProductModel';
import { useState } from 'react';

export interface LoanProductState {
  loanProductList: LoanProductRp[];
  totalRecords: number;
}

export interface FetchLoanProductsPayload {
  active: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface LoanProductResponse {
  loanProductRpList: LoanProductRp[];
  totalRecords: number;
}

export default function useLoanProductModel() {
  const [loanProductList, setLoanProductList] = useState<LoanProductRp[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchLoanProductsWrapper = async (payload: {
    active: boolean;
    pageNumber: number;
    pageSize: number;
  }) => {
    try {
      const response = await fetchLoanProducts(
        payload.active,
        payload.pageNumber,
        payload.pageSize,
      );
      console.log(response);
      setLoanProductList(response.data.loanProductRpList);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu sản phẩm vay:', error);
    }
  };
  const createNewLoanProduct = async (loanProduct: LoanProduct) => {
    try {
      await createLoanProduct(loanProduct);
      console.log('Tạo sản phẩm vay thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm vay:', error);
    }
  };
  const deleteLoanProductById = async (id: string) => {
    try {
      const response = await deleteLoanProduct(id);
      setLoanProductList((prevList) =>
        prevList.filter((product) => product.productId !== id),
      );
      console.log(response);
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm vay:', error);
    }
  };
  const getLoanProductById = async (id: string) => {
    try {
      const response = await getDetailLoanProduct(id);
      return response;
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm vay:', error);
    }
  };
  return {
    loanProductList,
    totalRecords,
    fetchLoanProducts: fetchLoanProductsWrapper,
    createNewLoanProduct,
    deleteLoanProductById,
    getLoanProductById,
  };
}
