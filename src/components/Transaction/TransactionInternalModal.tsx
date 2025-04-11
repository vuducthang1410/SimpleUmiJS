import { TransactionRequest } from '@/types/Transaction';
import { formatCurrency } from '@/utils/format';
import { CloseSquareFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import {
  AutoComplete,
  Button,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../Loading';
const { Title, Text } = Typography;
const { Option } = Select;

interface TransactionInternalModalProps {
  handleCancel: () => void;
  isOpen: boolean;
}

const TransactionInternalModal: React.FC<TransactionInternalModalProps> = ({
  handleCancel,
  isOpen,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isCounting, setIsCounting] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const { fetchFinancialInfo } = useSelector(
    (state: any) => state.financialInfo,
  );
  const { accountInfoReceiver, loading } = useSelector(
    (state: any) => state.transaction,
  );
  const { user } = useSelector((state: any) => state.auth);
  const [transactionData, setTransactionData] = useState<TransactionRequest>(
    {},
  );
  const handleChange = (key: keyof TransactionRequest, value: any) => {
    setTransactionData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
        callback: (transactionId: string) => {
          setTransactionId(transactionId);
          setIsConfirm(true);
          setCountdown(30);
          setIsCounting(true);
          message.success('Vui lòng kiểm tra mail để nhận mã otp');
        },
      });
    } catch (error) {
      message.error('Chuyển khoản thất bại!');
    } finally {
    }
  };
  const clearAndCancel = () => {
    handleCancel();
    setTransactionData({});
    setOtp('');
    setTransactionId('');
  };
  const confirmTransaction = () => {
    if (transactionId === '') message.warning('Lỗi hệ thống');
    dispatch({
      type: 'transaction/confirmTransactionInternal',
      payload: {
        transactionId: transactionId,
        otp: otp,
      },
      callback: () => {
        message.success('Chuyển khoản thành công!!');
        dispatch({
          type: 'transaction/getTransactionHistory',
          payload: {
            pageSize: 12,
            pageNumber: 0,
            accountBankingNumber:
              fetchFinancialInfo.financialInfoDetail.bankingAccountNumber,
          },
        });
        clearAndCancel();
      },
    });
  };
  useEffect(() => {
    console.log(isConfirm);
  }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown == 0 && isCounting === false) {
      return;
    }
    setCountdown(30);
    setIsCounting(true);
    if (isCounting) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            console.log('hehe');
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
  const [otp, setOtp] = useState('');

  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };
  return (
    <>
      <LoadingOverlay loading={loading} />
      {!isConfirm ? (
        <Modal
          title={
            <div style={{ textAlign: 'center', fontSize: 18 }}>
              Giao dịch nội bộ
            </div>
          }
          open={isOpen}
          onOk={handleSubmit}
          onCancel={clearAndCancel}
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
              <Button onClick={clearAndCancel} style={{ marginRight: 8 }}>
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
            <AutoComplete
              style={{ width: '100%' }}
              onSearch={(text) => {
                console.log(text.length === 15);
                if (text.length === 15) {
                  dispatch({
                    type: 'transaction/getInfoAccountByAccountNumber',
                    payload: { accountBankingNumber: text },
                  });
                }
              }}
              placeholder="Number account receiver"
              allowClear={{ clearIcon: <CloseSquareFilled /> }}
            />

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
            <InputNumber
              style={{ width: '100%', marginTop: 5 }}
              min={1}
              placeholder="Nhập số tiền"
              value={transactionData.amount || undefined} // Đảm bảo kiểu hợp lệ
              onChange={(value) => handleChange('amount', value || 0)}
              onFocus={() => setIsEditing(true)} // Khi click vào input, xóa "VND"
              onBlur={() => setIsEditing(false)} // Khi rời khỏi input, thêm "VND"
              formatter={(value) =>
                isEditing
                  ? value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Không có VND khi focus
                  : value
                  ? `${value
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`
                  : ''
              }
              parser={(value) =>
                value ? Number(value.replace(/\./g, '').replace(' VND', '')) : 0
              }
            />

            <label style={{ marginTop: 10, display: 'block' }}>
              Phí giao dịch
            </label>
            <Select
              value={transactionData.feePayer}
              style={{ width: '100%', marginTop: 5 }}
              onChange={(value) => handleChange('feePayer', value)}
            >
              <Option value="SENDER">Người gửi chịu phí</Option>
              <Option value="RECEIVER">Người nhận chịu phí</Option>
            </Select>

            <label style={{ marginTop: 10, display: 'block' }}>
              Nội dung chuyển khoản
            </label>
            <Input.TextArea
              placeholder="Nhập nội dung"
              value={transactionData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <label style={{ marginTop: 10, display: 'block' }}>
              Phương thức giao dịch
            </label>
            <Select
              value={transactionData.method}
              style={{ width: '100%', marginTop: 5 }}
              onChange={(value) => handleChange('method', value)}
            >
              <Option value="ONLINE_BANKING">Ngân hàng trực tuyến</Option>
              <Option value="MOBILE_APP">Ứng dụng di động</Option>
            </Select>
          </div>
        </Modal>
      ) : (
        <Modal
          title={
            <div style={{ textAlign: 'center', fontSize: 18 }}>
              Giao dịch nội bộ
            </div>
          }
          open={isOpen}
          onOk={handleSubmit}
          onCancel={() => {
            clearAndCancel();
            setIsConfirm(false);
          }}
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
              <Button
                onClick={() => {
                  clearAndCancel();
                  setIsConfirm(false);
                }}
                style={{ marginRight: 8 }}
              >
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                onClick={confirmTransaction}
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
            <Text>
              {`Số tiền giao dịch: ${formatCurrency(
                transactionData.amount?.toString() || '0',
              )}`}
            </Text>

            <label style={{ marginTop: 10, display: 'block' }}>
              Phí giao dịch
            </label>
            <Select
              value={transactionData.feePayer}
              style={{ width: '100%', marginTop: 5 }}
            >
              <Option value="SENDER">Người gửi chịu phí</Option>
              <Option value="RECEIVER">Người nhận chịu phí</Option>
            </Select>

            <label style={{ marginTop: 10, display: 'block' }}>
              Nội dung chuyển khoản: <Text>{transactionData.description}</Text>
            </label>

            <label style={{ marginTop: 10, display: 'block' }}>
              Phương thức giao dịch: 0VND
            </label>
            <Select
              value={transactionData.method}
              style={{ width: '100%', marginTop: 5 }}
            >
              <Option value="ONLINE_BANKING">Ngân hàng trực tuyến</Option>
              <Option value="MOBILE_APP">Ứng dụng di động</Option>
            </Select>
          </div>
          <Input
            value={otp}
            onChange={handleChangeOtp}
            maxLength={6}
            placeholder="Nhập mã OTP"
            style={{ width: 200 }}
          />
          <div style={{ marginTop: 10 }}>
            {isCounting ? (
              <Text>Gửi lại mã OTP sau {countdown} giây</Text>
            ) : (
              <Button type="link" onClick={handleSubmit} style={{ padding: 0 }}>
                Gửi lại mã OTP
              </Button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default TransactionInternalModal;
