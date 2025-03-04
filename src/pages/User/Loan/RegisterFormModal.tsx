import { API } from '@/types/financialInfo';
import { LoanRegisterInfo } from '@/types/LoanInfo';
import { useDispatch, useSelector } from '@umijs/max';
import {
  App,
  Button,
  Checkbox,
  Form,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
interface DataProps {
  loanProductId: string;
  loanProductName: string;
  amountLoanLimit: string;
  loanTermLimit: number;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoanRegistrationForm: React.FC<DataProps> = ({
  loanProductId,
  loanProductName,
  isModalOpen,
  setIsModalOpen,
  loanTermLimit,
  amountLoanLimit,
}) => {
  const [financialInfoRp, setFinancialInfoResponse] =
    useState<API.FinancialInfoRp>();
  const dispatch = useDispatch();
  const { fetchLoanDetailInfo } = useSelector((state: any) => state.loanDetailInfo)
  const [isAgreed, setIsAgreed] = useState(false);
  const [loanRegisterInfo, setLoanRegisterInfo] = useState<LoanRegisterInfo>({
    cifCode: '',
    formDeftRepayment: '',
    loanAmount: 0,
    loanProductId: '',
    loanTerm: 0,
    loanUnit: '',
  });
  const handleChange = (key: string, value) => {
    setLoanRegisterInfo((prev) => ({ ...prev, [key]: value }));
  };
  const pushNoti = (messageNoti: string, isSuccess: boolean) => {
    if (isSuccess) message.success(messageNoti)
    else message.error(messageNoti)
  }
  const handleSubmit = () => {
    if (!isAgreed) {
      alert('Bạn phải đồng ý với điều khoản trước khi gửi đăng ký vay!');
      return;
    }
    dispatch({
      type: 'loanDetailInfo/registerLoanInfo',
      payload: { loanDetailInfo: loanRegisterInfo, callbackSetStatusModal: setIsModalOpen, callbackPushNoti: pushNoti }
    })
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData && loanProductId)
      setLoanRegisterInfo((prev) => ({
        ...prev,
        cifCode: userData.cifCode,
        loanProductId: loanProductId,
      }));
    dispatch({
      type: 'financialInfo/getFinancialInfoByCifCode',
      payload: {
        cifCode: userData.cifCode,
        callback: setFinancialInfoResponse,
      },
    });
  }, [isModalOpen]);

  return (
    <App style={styles.container}>
      <Modal
        title={
          <Title level={3} style={styles.title}>
            📌 Đăng ký vay vốn
          </Title>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        {/* Thông tin cá nhân */}
        <div style={styles.sectionContainer}>
          <label style={styles.sectionTitle}>Thông tin cá nhân</label>
          <div style={styles.infoItem}>
            <Text strong>Họ và tên:</Text> {financialInfoRp?.customerName}
          </div>
          <div style={styles.infoItem}>
            <Text strong>Số điện thoại:</Text> {financialInfoRp?.numberPhone}
          </div>
          <div style={styles.infoItem}>
            <Text strong>CCCD:</Text> {financialInfoRp?.identificationNumber}
          </div>
          <div style={styles.infoItem}>
            <Text strong>Ngày sinh:</Text> {financialInfoRp?.dateOfBirth}
          </div>
          <div style={styles.infoItem}>
            <Text strong>Hạn mức vay còn lại:</Text>{' '}
            {financialInfoRp?.amountLoanLimit}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            marginBottom: 10,
          }}
        >
          <span style={styles.sectionTitle}>Sản phẩm vay: </span>{' '}
          <span>
            {'Tên sản phẩm: '}
            <label>{loanProductName}</label>
          </span>
          <span>
            {'Số tiền vay tối đa: '}
            <label>{amountLoanLimit}</label>
          </span>
          <span>
            {'Kỳ hạn vay tối đa: '}
            <label>{loanTermLimit}</label>
            {' tháng'}
          </span>
        </div>
        {/* Form đăng ký vay */}
        <Form layout="vertical" onFinish={handleSubmit}>
          <span style={styles.sectionTitle}>Thông tin vay vốn: </span>{' '}
          <Form.Item label={<Text strong>Phương thức trả nợ</Text>} required>
            <Select
              style={styles.input}
              placeholder="Chọn phương thức"
              value={loanRegisterInfo.formDeftRepayment}
              onChange={(value) => handleChange('formDeftRepayment', value)}
            >
              <Option value="PRINCIPAL_INTEREST_DECREASING">
                Trả gốc & lãi theo dư nợ giảm dần
              </Option>
              <Option value="PRINCIPAL_AND_INTEREST_MONTHLY">
                Trả gốc & lãi cố định hàng tháng
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label={<Text strong>Số tiền vay (VNĐ)</Text>} required>
            <InputNumber
              style={styles.moneyInput}
              min={1}
              placeholder="Nhập số tiền"
              value={loanRegisterInfo.loanAmount}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => parseInt(value?.replace(/\D/g, '') || '0', 10)}
              onChange={(value) => handleChange('loanAmount', value)}
            />
          </Form.Item>
          <Form.Item label={<Text strong>Kỳ hạn vay</Text>} required>
            <InputNumber
              style={styles.input}
              min={0}
              placeholder="Nhập kỳ hạn"
              value={loanRegisterInfo.loanTerm}
              onChange={(value) => handleChange('loanTerm', value)}
            />
          </Form.Item>
          <Form.Item label={<Text strong>Đơn vị kỳ hạn</Text>} required>
            <Select
              style={styles.input}
              value={loanRegisterInfo.loanUnit}
              onChange={(value) => handleChange('loanUnit', value)}
            >
              <Option value="MONTH">Tháng</Option>
              <Option value="YEAR">Năm</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
            >
              Tôi đồng ý với các điều khoản và điều kiện vay
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={!isAgreed}
              style={styles.submitButton}
            >
              Gửi đăng ký vay
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </App>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  title: { textAlign: 'center' as 'center', color: '#1890ff' },
  sectionContainer: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f0f2f5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 800,
    marginBottom: '10px',
    display: 'block',
    color: '#333',
  },
  infoItem: { marginBottom: '10px' },
  input: { width: '100%' },
  moneyInput: { width: '100%', fontSize: '14px' },
  submitButton: {
    backgroundColor: '#1890ff',
    color: 'white',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '8px',
  },
};

export default LoanRegistrationForm;
