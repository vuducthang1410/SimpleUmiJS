import {
  createInterestRate,
  getInterestRateByLoanProductId,
} from '@/services/interestRate/interestRate';
import { InterestRate, InterestRateRq } from '@/types/InterestRate';
import { useState } from 'react';

export default function useLoanInterstRate() {
  const [interestRateList, setInterestRateList] = useState<InterestRate[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchInterestRateWrapper = async (payload: {
    loanProductId: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    try {
      const response = await getInterestRateByLoanProductId(
        payload.loanProductId,
        payload.pageNumber,
        payload.pageSize,
      );
      console.log(response);
      setInterestRateList(response.data.interestRateList);
      setTotalRecords(response.data.totalRecord);
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu lãi suất:', error);
    }
  };
  const createNewInterestRate = async (interestRate: InterestRateRq) => {
    try {
      await createInterestRate(interestRate);
      console.log('Tạo lãi suất thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo lãi suất:', error);
    }
  };
  return {
    createNewInterestRate,
    fetchInterestRateWrapper,
  };
}
