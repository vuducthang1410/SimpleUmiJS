import { TransactionRequest } from '@/types/Transaction';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message, Modal, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
const { Title, Text } = Typography;
const { Option } = Select;

interface ConfirmTransactionInternalModalProps {
  handleCancel: () => void;
  isOpen: boolean;
  transactionData: TransactionRequest;
}

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});
const ConfirmTransactionInternalModal: React.FC<
  ConfirmTransactionInternalModalProps
> = ({ handleCancel, isOpen, transactionData }) => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(30);
  const [isCounting, setIsCounting] = useState(false);
  const { fetchFinancialInfo } = useSelector(
    (state: any) => state.financialInfo,
  );
  const { accountInfoReceiver } = useSelector(
    (state: any) => state.transaction,
  );
  const { user, loading } = useSelector((state: any) => state.auth);

  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  // Xử lý xác nhận chuyển khoản
  const handleSubmit = async () => {
    if (!fetchFinancialInfo.financialInfoDetail) return;
    if (!accountInfoReceiver) return;
    const dataToSend = {
      ...transactionData,
      cifCode: user.cifCode,
      senderAccount:
        fetchFinancialInfo.financialInfoDetail.bankingAccountNumber,
      senderAccountId: fetchFinancialInfo.financialInfoDetail.accountId,
      senderAccountType: fetchFinancialInfo.financialInfoDetail.accountType,
      initiator: 'CUSTOMER',
      type: 'TRANSFER',
      method: 'ONLINE_BANKING',
      receiverAccount: accountInfoReceiver.accountNumber,
      receiverAccountType: accountInfoReceiver.accountType,
      fee: 0,
      note: 'banking',
    };

    try {
      console.log('Dữ liệu gửi:', dataToSend);
      dispatch({
        type: 'transaction/executeTransactionInternal',
        payload: {
          data: dataToSend,
        },
      });
      message.success('Chuyển khoản thành công!');
    } catch (error) {
      message.error('Chuyển khoản thất bại!');
    } finally {
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // if (isConfirmModalOpen) {
    setCountdown(30);
    setIsCounting(true);
    // }

    if (isCounting) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsCounting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCounting]);

  return (
    <>
      <Modal
        title={
          <div style={{ textAlign: 'center', fontSize: 18 }}>
            Giao dịch nội bộ
          </div>
        }
        open={isOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        okButtonProps={{
          style: {
            backgroundColor: '#ff8e2e',
            borderColor: '#ff8e2e',
            marginTop: 20,
          },
        }}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#ff8e2e',
                borderColor: '#ff8e2e',
              }}
            >
              Xác nhận
            </Button>
          </div>
        }
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: 25,
        }}
      >
        {/* Thông tin người chuyển */}
        <div style={{ marginBottom: 20 }}>
          <Title
            level={4}
            style={{ borderBottom: '2px solid #ff8e2e', paddingBottom: 5 }}
          >
            Thông tin người chuyển
          </Title>
          <Text strong>Tên tài khoản: </Text>
          <Text>{fetchFinancialInfo.financialInfoDetail.customerName}</Text>
          <br />
          <Text strong>Số tài khoản: </Text>
          <Text>
            {fetchFinancialInfo.financialInfoDetail.bankingAccountNumber}
          </Text>{' '}
          <br />
          <Text strong>Số dư: </Text>
          <Text>
            {fetchFinancialInfo.financialInfoDetail.balanceBankingAccount}
          </Text>
        </div>

        {/* Thông tin người nhận */}
        <div style={{ marginBottom: 20 }}>
          <Title
            level={4}
            style={{ borderBottom: '2px solid #ff8e2e', paddingBottom: 5 }}
          >
            Thông tin người nhận
          </Title>

          <label style={{ marginTop: 10, display: 'block' }}>
            Số tài khoản nhận
          </label>
          <Text>{transactionData.receiverAccount}</Text>

          <label style={{ marginTop: 10, display: 'block' }}>
            {`Tên người thụ hưởng: ${accountInfoReceiver?.accountName}`}
          </label>
          <span></span>
        </div>

        {/* Thông tin giao dịch */}
        <div style={{ marginBottom: 20 }}>
          <Title
            level={4}
            style={{ borderBottom: '2px solid #ff8e2e', paddingBottom: 5 }}
          >
            Thông tin giao dịch
          </Title>
          <Text>{transactionData.amount}</Text>

          <label style={{ marginTop: 10, display: 'block' }}>
            Phí giao dịch
          </label>
          <Select>value={transactionData.feePayer}</Select>

          <label style={{ marginTop: 10, display: 'block' }}>
            Nội dung chuyển khoản
          </label>
          <Text>{transactionData.description}</Text>

          <label style={{ marginTop: 10, display: 'block' }}>
            Phương thức giao dịch
          </label>
          <Select
            value={transactionData.method}
            style={{ width: '100%', marginTop: 5 }}
          >
            <Option value="ONLINE_BANKING">Ngân hàng trực tuyến</Option>
            <Option value="MOBILE_APP">Ứng dụng di động</Option>
          </Select>
        </div>
        <div style={{ marginTop: 10 }}>
          {isCounting ? (
            <Text>Gửi lại mã OTP sau {countdown} giây</Text>
          ) : (
            <Button
              type="link"
              // onClick={handleResendOtp}
              style={{ padding: 0 }}
            >
              Gửi lại mã OTP
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ConfirmTransactionInternalModal;
