import { getLoanApplicants } from '@/services/loan/info';
import { LoanApplicant, LoanInfoApproveRq } from '@/types/LoanInfo';
import { useDispatch } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export const useLoanApplicants = () => {
  const dispath = useDispatch();
  const [data, setData] = useState<LoanApplicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [selectedLoanStatus, setSelectedLoanStatus] = useState('PENDING');

  useEffect(() => {
    loadLoanApplicants();
  }, [currentPage, selectedLoanStatus]);

  const loadLoanApplicants = async () => {
    setLoading(true);
    try {
      const response = await getLoanApplicants(currentPage, selectedLoanStatus);
      setData(response.data.dataResponse);
      setTotal(response.data.totalRecord);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu.');
    }
    setLoading(false);
  };
  const approvedLoanRegisterRq = (
    loanInfoApproveRq: LoanInfoApproveRq,
    pushNoti: (messageNoti: string, isSuccess: boolean) => void,
  ) => {
    dispath({
      type: 'loanDetailInfoCms/approvedLoanInfo',
      payload: {
        loanInfoApproveRq: loanInfoApproveRq,
        cbLoadData: loadLoanApplicants,
        cbPushNoti: pushNoti,
      },
    });
  };

  return {
    data,
    loading,
    currentPage,
    total,
    selectedLoanStatus,
    setCurrentPage,
    setSelectedLoanStatus,
    loadLoanApplicants,
    approvedLoanRegisterRq,
  };
};
