import { DataCallback } from '@/types/InterestRate';
import { PaymentScheduleRp, PaymentType } from '@/types/LoanInfo';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Descriptions, Modal, Spin, Table, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface LoanDetailModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoanInfoDetailPaymentModal: React.FC<LoanDetailModalProps> = ({
  visible,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const { loanDetailInfo, paymentScheduleList } = useSelector(
    (state: any) => state.loanDetailInfo.fetchLoanDetailInfo,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      fetchSchedules();
    }
  }, [visible]);

  const fetchSchedules = () => {
    setLoading(true);
    try {
      dispatch({
        type: 'loanDetailInfo/getPaymentScheduleByLoanDetailInfo',
        payload: { loanInfoId: loanDetailInfo.loanInfoId },
        callback: (response: DataCallback) => {
          if (response.isSuccess) {
            message.success(response.message);
          } else {
            message.error(response.message);
          }
        },
      });
    } catch (error) {
      message.error('Không thể lấy danh sách kỳ thanh toán');
    }
    setLoading(false);
  };

  const getStatusTag = (status: string, isPaid: boolean) => {
    if (isPaid) return <Tag color="green">Đã thanh toán</Tag>;
    switch (status) {
      case 'NOT_DUE':
        return <Tag color="orange">Chưa đến hạn</Tag>;
      case 'OVERDUE':
        return <Tag color="red">Quá hạn</Tag>;
      default:
        return <Tag color="gray">Không xác định</Tag>;
    }
  };

  const handlePayment = (paymentId: string) => {
    setLoading(true);
    try {
      dispatch({
        type: 'loanDetailInfo/repaymentSchedulePeriodTerm',
        payload: {
          paymentScheduleId: paymentId,
          paymentType: PaymentType.ALL,
          loanDetailInfoId: loanDetailInfo.loanInfoId,
        },
        callback: (response: string) => {
          if (response === null) {
            message.error('Lỗi khi thanh toán khoản vay!!');
          } else {
            message.success('Thanh toán thành công!');
          }
          onClose();
          setLoading(false);
        },
      });
    } catch (error) {}
  };

  const columns = [
    { title: 'Kỳ hạn', dataIndex: 'nameSchedule', key: 'nameSchedule' },
    { title: 'Ngày đến hạn', dataIndex: 'dueDate', key: 'dueDate' },
    {
      title: 'Số tiền còn lại',
      dataIndex: 'amountRemaining',
      key: 'amountRemaining',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: string, record: PaymentScheduleRp) =>
        getStatusTag(record.status, record.isPaid),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: PaymentScheduleRp) =>
        !record.isPaid ? (
          <Button
            type="primary"
            onClick={() => handlePayment(record.paymentScheduleId)}
          >
            Thanh toán
          </Button>
        ) : (
          <Button type="primary" disabled>
            Thanh toán
          </Button>
        ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: PaymentScheduleRp) => (
        <Button
          type="default"
          onClick={() => handlePayment(record.paymentScheduleId)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];
  useEffect(() => {
    console.log(paymentScheduleList);
  }, [paymentScheduleList]);
  return (
    <Modal
      title="Chi tiết khoản vay"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={700}
    >
      {loading ? (
        <Spin
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0',
          }}
        />
      ) : (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên sản phẩm vay">
              {loanDetailInfo.loanProductName}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày vay">
              {loanDetailInfo.loanDate}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đến hạn tất toán">
              {loanDetailInfo.dueDate}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng số tiền vay">
              {loanDetailInfo.loanAmount}
            </Descriptions.Item>
            <Descriptions.Item label="Số tiền còn lại">
              {loanDetailInfo.loanAmountRemaining}
            </Descriptions.Item>
            <Descriptions.Item label="Kỳ hạn hiện tại">
              {loanDetailInfo.loanTermName}{' '}
            </Descriptions.Item>
            <Descriptions.Item label="Kỳ hạn vay">
              {loanDetailInfo.loanTerm} tháng
            </Descriptions.Item>
          </Descriptions>

          <h3 style={{ marginTop: '20px' }}>Lịch thanh toán</h3>
          <Table
            dataSource={paymentScheduleList}
            columns={columns}
            rowKey="paymentScheduleId"
            pagination={false}
          />
        </>
      )}
    </Modal>
  );
};

export default LoanInfoDetailPaymentModal;
