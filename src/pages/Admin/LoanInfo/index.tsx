import { LoanInfoApproveRq } from '@/types/LoanInfo';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useLoanApplicants } from './hook';
import LoanFilter from './LoanFilterStatus';
import LoanTable from './LoanInfoTable';
import LoanModal from './LoanModalApproved';

const LoanApplicants: React.FC = () => {
  const {
    data,
    loading,
    currentPage,
    total,
    selectedLoanStatus,
    setCurrentPage,
    setSelectedLoanStatus,
    approvedLoanRegisterRq,
  } = useLoanApplicants();

  const pushNoti = (messageNoti: string, isSuccess: boolean) => {
    if (isSuccess) message.success(messageNoti);
    else message.error(messageNoti);
  };
  const navigate = useNavigate();
  const [approvalStatus, setApprovalStatus] = useState<
    'APPROVED' | 'REJECTED' | ''
  >('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLoanId, setCurrentLoanId] = useState<string | null>(null);
  const handleViewDetails = useCallback(
    (id: string) => navigate(`/loan-applicant/${id}`),
    [navigate],
  );

  const showNoteModal = useCallback((id: string) => {
    setCurrentLoanId(id);
    setIsModalVisible(true);
  }, []);

  const handleConfirmStatus = useCallback(
    (loanInfoApproveRq: LoanInfoApproveRq) => {
      setIsModalVisible(false);
      approvedLoanRegisterRq(loanInfoApproveRq, pushNoti);
    },
    [approvedLoanRegisterRq],
  );

  const handleCancle = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleApprove = useCallback(
    (id: string) => {
      setApprovalStatus('APPROVED');
      showNoteModal(id);
    },
    [showNoteModal],
  );

  const handleReject = useCallback(
    (id: string) => {
      setApprovalStatus('REJECTED');
      showNoteModal(id);
    },
    [showNoteModal],
  );

  // Dùng useMemo để tránh render lại LoanTable không cần thiết
  const memoizedData = useMemo(() => data, [data]);
  const memoizedLoading = useMemo(() => loading, [loading]);
  const memoizedTotal = useMemo(() => total, [total]);
  const memoizedCurrentPage = useMemo(() => currentPage, [currentPage]);

  return (
    <PageContainer>
      <LoanFilter
        loanStatusList={[
          { label: 'Chờ xét duyệt', value: 'PENDING' },
          { label: 'Đã duyệt', value: 'APPROVED' },
          { label: 'Từ chối', value: 'REJECTED' },
        ]}
        selectedLoanStatus={selectedLoanStatus}
        onChange={setSelectedLoanStatus}
      />
      <LoanModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmStatus}
        onCancel={handleCancle}
        loanId={currentLoanId}
        approvalStatus={approvalStatus}
      />

      <LoanTable
        data={memoizedData}
        loading={memoizedLoading}
        currentPage={memoizedCurrentPage}
        total={memoizedTotal}
        onPageChange={setCurrentPage}
        onViewDetails={handleViewDetails}
        selectedLoanStatus={selectedLoanStatus}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </PageContainer>
  );
};

export default LoanApplicants;
