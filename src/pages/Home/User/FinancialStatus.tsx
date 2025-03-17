import LoanPieChart from '@/components/Financial/PieChart';
import FinancialInfoRegisterModal from '@/pages/User/FinancialInfo/Register';
import { DataCallback } from '@/types/InterestRate';
import {
  BankOutlined,
  CalendarOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
  HourglassOutlined,
  IdcardOutlined,
  PhoneOutlined,
  SmileOutlined,
  SolutionOutlined,
  TeamOutlined,
  TransactionOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card, Descriptions, message, Spin, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import './FinancialStatus.css';
import FinancialInfoDrawer from '@/components/Financial/FinancialInfoDetailDrawer';
const FinancialStatusStepForm: React.FC = () => {
  const dispatch = useDispatch();
  const { financialInfoDetail } = useSelector(
    (state: any) => state.financialInfo.fetchFinancialInfo,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const { user, loading } = useSelector((state: any) => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [columnCount, setColumnCount] = useState(
    window.innerWidth < 768 ? 1 : 2,
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  useEffect(() => {
    if (user) {
      dispatch({
        type: 'financialInfo/fetchFinancialInfo',
        payload: {
          cifCode: user.cifCode,
        },
        callback: (response: DataCallback) => {
          if (!response.isSuccess) {
            message.error(response.message);
          }
        },
      });
    }
  }, [user]);
  useEffect(() => {
    const handleResize = () => {
      setColumnCount(window.innerWidth < 768 ? 1 : 2);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (financialInfoDetail) {
      if (financialInfoDetail.isExpired && !financialInfoDetail.isRegistered) {
        setCurrentStep(0);
      } else {
        switch (financialInfoDetail.requestStatus) {
          case 'PENDING':
            setCurrentStep(1);
            break;
          case 'APPROVED':
          case 'REJECTED':
            setCurrentStep(2);
            break;
          default:
            setCurrentStep(1);
        }
      }
    }
    console.log(financialInfoDetail);
  }, [financialInfoDetail]);

  return (
    <div
      className="box-container"
      style={{ width: '100%', margin: 'auto', padding: 20 }}
    >
      {/* Loading Indicator */}
      {loading ? (
        <Spin size="large" style={{ display: 'block', marginTop: 20 }} />
      ) : (
        <div className="card-container" style={{ width: '75%' }}>
          {/* Thông tin khách hàng */}
          <Card
            title="🔹 Thông tin khách hàng"
            variant="outlined"
            style={{
              borderRadius: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Descriptions column={columnCount} layout="horizontal">
              <Descriptions.Item
                label={
                  <span
                    style={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <UserOutlined />
                    <label> Họ và tên</label>
                  </span>
                }
              >
                <strong>
                  {financialInfoDetail?.customerName || 'Chưa cập nhật'}
                </strong>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ width: '45%' }}
                label={
                  <span
                    style={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <PhoneOutlined /> <label>Số điện thoại</label>
                  </span>
                }
              >
                {financialInfoDetail?.numberPhone || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span
                    style={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <IdcardOutlined /> <label>Số CMND/CCCD</label>
                  </span>
                }
              >
                {financialInfoDetail?.identificationNumber || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span
                    style={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <CalendarOutlined />
                    <label>Ngày sinh</label>
                  </span>
                }
              >
                {financialInfoDetail?.dateOfBirth || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span
                    style={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <BankOutlined />
                    <label>Số tài khoản ngân hàng</label>
                  </span>
                }
              >
                {financialInfoDetail?.bankingAccountNumber || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span
                    style={{
                      display: 'flex',
                      justifyItems: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <DollarOutlined />
                    <label>Số dư tài khoản</label>
                  </span>
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
          <div style={{ marginTop: 15 }}>
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
          </div>

          {/* Thông tin tài chính */}
          <Card
            title="📊 Thông tin tài chính"
            variant="borderless"
            style={{ marginTop: 10, marginBottom: 20, overflowX: 'auto' }}
          >
            <Descriptions column={columnCount} layout="horizontal">
              {/* Hạn mức vay */}
              <Descriptions.Item
                label={
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <WalletOutlined /> <label>Hạn mức vay</label>
                  </span>
                }
              >
                {financialInfoDetail?.amountLoanLimit || 'Chưa cập nhật'}
              </Descriptions.Item>

              {/* Số tiền có thể vay */}
              <Descriptions.Item
                style={{ width: '45%' }}
                label={
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <TransactionOutlined /> <label>Số tiền có thể vay</label>
                  </span>
                }
              >
                {financialInfoDetail?.amountMaybeLoanRemain || 'Chưa cập nhật'}
              </Descriptions.Item>

              {/* Trạng thái yêu cầu */}
              <Descriptions.Item
                label={
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <FileDoneOutlined /> <label>Trạng thái yêu cầu</label>
                  </span>
                }
              >
                {financialInfoDetail?.requestStatus || 'Chưa cập nhật'}
              </Descriptions.Item>

              {/* Đối tượng áp dụng */}
              <Descriptions.Item
                label={
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <TeamOutlined /> <label>Đối tượng khách hàng</label>
                  </span>
                }
              >
                {financialInfoDetail?.applicableObjects || 'Chưa cập nhật'}
              </Descriptions.Item>

              {/* Ngày hết hạn */}
              <Descriptions.Item
                label={
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <HourglassOutlined /> <label>Ngày hết hạn</label>
                  </span>
                }
              >
                {financialInfoDetail?.expiredDate || 'Chưa cập nhật'}
              </Descriptions.Item>

              {/* Trạng thái hết hạn */}
              <Descriptions.Item
                label={
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <ExclamationCircleOutlined />{' '}
                    <label>Trạng thái hết hạn</label>
                  </span>
                }
              >
                <strong
                  style={{
                    color:
                      financialInfoDetail?.isExpired === true
                        ? 'red'
                        : financialInfoDetail?.isExpired === false
                        ? 'green'
                        : 'gray',
                  }}
                >
                  {financialInfoDetail?.isExpired === true
                    ? 'Đã hết hạn'
                    : financialInfoDetail?.isExpired === false
                    ? 'Còn hiệu lực'
                    : 'Chưa cập nhật'}
                </strong>
              </Descriptions.Item>
            </Descriptions>
            <div
              style={{
                display: 'flex',
                justifyItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: 20,
              }}
            >
              {financialInfoDetail.isRegistered ? (
                <div>
                  <Button type="primary" onClick={() => setModalVisible(true)}>
                    Đăng ký thông tin tài chính
                  </Button>
                  <FinancialInfoRegisterModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                  />
                </div>
              ) : (
                <>
                  {' '}
                  <Button type="primary" onClick={handleOpenDrawer}>
                    Xem thông tin đăng ký
                  </Button>
                  <FinancialInfoRegisterModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                  />
                </>
              )}
            </div>
          </Card>
          <LoanPieChart />
          {true && (
            <FinancialInfoDrawer
              open={openDrawer}
              onClose={handleOpenDrawer}
              financialInfoId={financialInfoDetail.financialInfoId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialStatusStepForm;
