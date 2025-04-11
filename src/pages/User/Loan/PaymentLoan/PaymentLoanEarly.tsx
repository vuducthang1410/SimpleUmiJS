import { DataCallback } from '@/types/InterestRate';
import { EarlyFeeRepaymentLoanResponse, LoanDataRp } from '@/types/LoanInfo';
import { getUserInfoInLocalStorage } from '@/utils/UserInfo';
import { useDispatch } from '@umijs/max';
import { Button, Descriptions, Modal, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface LoanDetailModalProps {
  visible: boolean;
  onClose: () => void;
  loanId: string;
  currentPage: number;
  pageSize: number;
}

const LoanDetailModal: React.FC<LoanDetailModalProps> = ({
  visible,
  onClose,
  loanId,
  currentPage,
  pageSize,
}) => {
  const [loanData, setLoanData] = useState<LoanDataRp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const user = getUserInfoInLocalStorage();
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      fetchLoanData();
    }
  }, [visible]);
  const fetchLoanData = () => {
    dispatch({
      type: 'loanDetailInfo/getEarlyFeeRepaymentLoan',
      payload: { loanInfoId: loanId },
      callback: (response: EarlyFeeRepaymentLoanResponse) => {
        setLoanData(response.data);
      },
    });
  };
  const earlyRepaymentLoan = () => {
    dispatch({
      type: 'loanDetailInfo/earlyRepaymentLoan',
      payload: {
        loanInfoId: loanId,
        currentPage: currentPage,
        pageSize: pageSize,
        cifCode: user?.cifCode,
      },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success('thanh toán thành công');
        } else {
          message.error(response.message);
        }
        onClose()
      },
    });
  };
  return (
    <Modal
      title="Chi tiết khoản vay"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          {'Hủy'}
        </Button>,
        <Button type="primary" onClick={earlyRepaymentLoan}>
          {'Tất toán trước hạn'}
        </Button>,
      ]}
      width={600}
    >
      {loading ? (
        <Spin
          size="large"
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        />
      ) : loanData ? (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item key="loanProductName" label="Sản phẩm vay">
              {loanData.loanDetailInfo.loanProductName}
            </Descriptions.Item>
            <Descriptions.Item key="loanAmount" label="Số tiền vay">
              {loanData.loanDetailInfo.loanAmount}
            </Descriptions.Item>
            <Descriptions.Item key="interestRate" label="Lãi suất">
              {loanData.loanDetailInfo.interestRate}%
            </Descriptions.Item>
            <Descriptions.Item key="loanTerm" label="Thời hạn vay">
              {loanData.loanDetailInfo.loanTerm} {loanData.loanDetailInfo.unit}
            </Descriptions.Item>
            <Descriptions.Item key="createdDate" label="Ngày đăng ký vay">
              {loanData.loanDetailInfo.createdDate}
            </Descriptions.Item>
            <Descriptions.Item key="dateDisbursement" label="Ngày giải ngân">
              {loanData.loanDetailInfo.dateDisbursement}
            </Descriptions.Item>
            <Descriptions.Item key="douDate" label="Ngày đáo hạn">
              {loanData.loanDetailInfo.douDate}
            </Descriptions.Item>
            <Descriptions.Item key="loanStatus" label="Trạng thái khoản vay">
              {loanData.loanDetailInfo.loanStatus}
            </Descriptions.Item>
            <Descriptions.Item
              key="amountRemainingLoan"
              label="Số tiền còn lại"
            >
              {loanData.amountRemainingLoan}
            </Descriptions.Item>
            <Descriptions.Item
              key="interestCurrentPeriod"
              label="Lãi kỳ hiện tại"
            >
              {loanData.interestCurrentPeriod}
            </Descriptions.Item>
            <Descriptions.Item
              key="amountFinedNotYetPaid"
              label="Tiền phạt chưa thanh toán"
            >
              {loanData.amountFinedNotYetPaid}
            </Descriptions.Item>
            <Descriptions.Item key="amountFined" label="Tiền phạt thanh toán trước hạn">
              {loanData.amountFined}
            </Descriptions.Item>
            <Descriptions.Item
              key="amountNeedPayment"
              label="Số tiền cần thanh toán"
            >
              {loanData.amountNeedPayment}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Không có dữ liệu</p>
      )}
    </Modal>
  );
};

export default LoanDetailModal;
