import {
  BankOutlined,
  CalendarOutlined,
  DollarOutlined,
  IdcardOutlined,
  PhoneOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Descriptions, Spin, Steps } from 'antd';
import React, { useEffect, useState } from 'react';

const FinancialStatusStepForm: React.FC = () => {
  const dispatch = useDispatch();
  const { financialInfoDetail } = useSelector(
    (state: any) => state.financialInfo.fetchFinancialInfo,
  );
  const { user, loading } = useSelector((state: any) => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    console.log(user);
    if (user) {
      dispatch({
        type: 'financialInfo/fetchFinancialInfo',
        payload: {
          cifCode: user.cifCode,
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (financialInfoDetail) {
      switch (financialInfoDetail.requestStatus) {
        case 'PENDING':
          setCurrentStep(1);
          break;
        case 'APPROVED':
        case 'REJECTED':
          setCurrentStep(2);
          break;
        default:
          setCurrentStep(0);
      }
    }
    console.log(financialInfoDetail);
  }, [financialInfoDetail]);

  return (
    <div style={{ width: '80%', margin: 'auto', padding: 20 }}>
      {/* Loading Indicator */}
      {loading ? (
        <Spin size="large" style={{ display: 'block', marginTop: 20 }} />
      ) : (
        <>
          {/* Thông tin khách hàng */}
          <Card
            title="🔹 Thông tin khách hàng"
            variant="outlined"
            style={{
              borderRadius: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Descriptions column={2} layout="horizontal">
              <Descriptions.Item
                label={
                  <>
                    <UserOutlined /> Họ và tên
                  </>
                }
              >
                <strong>
                  {financialInfoDetail?.customerName || 'Chưa cập nhật'}
                </strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <PhoneOutlined /> Số điện thoại
                  </>
                }
              >
                {financialInfoDetail?.numberPhone || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <IdcardOutlined /> Số CMND/CCCD
                  </>
                }
              >
                {financialInfoDetail?.identificationNumber || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined /> Ngày sinh
                  </>
                }
              >
                {financialInfoDetail?.dateOfBirth || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <BankOutlined /> Số tài khoản ngân hàng
                  </>
                }
              >
                {financialInfoDetail?.bankingAccountNumber || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <DollarOutlined /> Số dư tài khoản
                  </>
                }
              >
                <strong style={{ color: 'green' }}>
                  {financialInfoDetail?.balanceBankingAccount ||
                    'Chưa cập nhật'}
                </strong>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          {/* Steps Indicator */}
          <Steps
            current={currentStep}
            items={[
              {
                title: 'Đăng ký thông tin tài chính',
                icon: <UserOutlined />,
              },
              {
                title: 'Chờ xét duyệt thông tin',
                icon: <SolutionOutlined />,
              },
              {
                title: 'Kết quả xét duyệt',
                icon: <SmileOutlined />,
              },
            ]}
          />
          {/* Thông tin tài chính */}
          <Card
            title="Thông tin tài chính"
            variant="borderless"
            style={{ marginTop: 16 }}
          >
            <Descriptions column={1} layout="vertical"></Descriptions>
          </Card>
        </>
      )}
    </div>
  );
};

export default FinancialStatusStepForm;
