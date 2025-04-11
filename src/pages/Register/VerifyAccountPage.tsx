import { DataCallback } from '@/types/InterestRate';
import { history, useDispatch, useLocation } from '@umijs/max';
import { Button, Card, Input, message, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

const AccountVerification: React.FC = () => {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const handleSubmit = () => {
    if (!verificationCode) {
      message.warning('Vui lòng nhập mã xác minh');
      return;
    }
    dispatch({
      type: 'auth/verifyAccount',
      payload: { code: verificationCode, mail: email},
      callback: (response: DataCallback) => {
        if (response.isSuccess == true) {
          message.success('Xác minh thành công!');
          history.push('/login');
        }else{
          message.error('Xác minh thất bại!');
        }
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fff7f0',
      }}
    >
      <Card
        style={{
          width: 400,
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: `1px solid #ff8e2e`,
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <img
            src="https://www.saokim.com.vn/wp-content/uploads/2023/01/Bieu-Tuong-Logo-Ngan-Hang-Kien-Long-Bank.png"
            alt="KLB-Banking Logo"
            style={{ width: 80, marginBottom: 8 }}
          />
          <Title level={3} style={{ color: '#ff8e2e', margin: 0 }}>
            KLB-Banking
          </Title>
          <Text>Vui lòng nhập mã xác minh được gửi đến email của bạn.</Text>

          <Input
            placeholder="Nhập mã xác minh"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength={6}
            style={{ borderColor: '#ff8e2e' }}
          />

          <Button
            type="primary"
            block
            loading={loading}
            onClick={handleSubmit}
            style={{
              backgroundColor: '#ff8e2e',
              borderColor: '#ff8e2e',
            }}
          >
            Xác minh
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default AccountVerification;
