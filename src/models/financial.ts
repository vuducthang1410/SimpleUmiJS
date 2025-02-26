import { fetchFinancialInfo } from '@/services/financialInfo/financialInfo';
import { API } from '@/types/financialInfo';
import { useCallback, useState } from 'react';
interface FinancialState {
  list: API.FinancialInfoItem[];
  totalRecords: number;
}
export default function useFinancialModel() {
  const [financial, setFinancial] = useState<FinancialState>({
    list: [],
    totalRecords: 0,
  });

  const fetchList = useCallback(async () => {
    try {
      const response = await fetchFinancialInfo();
      console.log('Dữ liệu trả về từ API:', response);

      setFinancial({
        list: response.data.financialInfoRpList,
        totalRecords: response.data.totalRecords || 0,
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tài chính:', error);
    }
  }, []);
  return {
    financial,
    fetchList,
  };
}
