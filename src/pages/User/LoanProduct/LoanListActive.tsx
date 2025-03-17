import { DataCallback } from '@/types/InterestRate';
import { LoanProductForUserRp } from '@/types/LoanProduct';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Card, List, message, Spin, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import LoanRegistrationForm from '../Loan/RegisterFormModal';
import LoanProductDetailDrawer from './LoanProductDetail';
const LoanListActive: React.FC = () => {
  const dispatch = useDispatch();
  const { loanProductList, loading } = useSelector(
    (state: any) => state.loanProductForUser,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const { financialInfoDetail } = useSelector(
    (state: any) => state.financialInfo.fetchFinancialInfo,
  );
  const openDrawer = (id: string) => {
    setSelectedProductId(id);
    setIsDrawerOpen(true);
  };
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  useEffect(() => {
    dispatch({
      type: 'loanProductForUser/fetchLoanProducts',
      payload: { pageNumber: 0, pageSize: 10 },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
  }, [dispatch]);
  const checkFinancialIsValid = () =>
    financialInfoDetail &&
    Object.keys(financialInfoDetail).length > 0 &&
    financialInfoDetail.financialInfoId;

  const pushNotiWarnResgisterFinancial = () => {
    message.warning('Vui lòng đăng ký thông tin tài chính để tiếp tục');
  };
  useEffect(() => {
    console.log('data', loanProductList);
  }, [loanProductList]);

  return (
    <App>
      <Spin spinning={loading}>
        <List
          grid={{
            gutter: 16,
            column: 3, // Mặc định là 4 cột
            xs: 1, // Mobile: 1 cột
            sm: 2, // Màn hình nhỏ: 2 cột
            md: 3, // Tablet: 3 cột
            lg: 3, // Màn hình lớn: 4 cột
            xl: 3, // Màn hình cực lớn: 4 cột
          }}
          dataSource={loanProductList}
          renderItem={(item: LoanProductForUserRp) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.nameLoanProduct}
                    src={item.urlImage}
                    style={{ height: 150, objectFit: 'cover' }}
                  />
                }
                style={{ width: '100%', maxWidth: 300, margin: 'auto' }}
              >
                <Typography.Title level={4}>
                  {item.nameLoanProduct}
                </Typography.Title>
                <p>
                  <strong>Lãi suất:</strong>{' '}
                  <Tag color="green">{item.minInterestRate}%</Tag> -{' '}
                  <Tag color="red">{item.maxInterestRate}%</Tag>
                </p>
                <p>
                  <strong>Số tiền vay tối đa:</strong>{' '}
                  {item.maxLoanAmount.toLocaleString()}
                </p>
                <p>
                  <strong>Thời hạn tối đa:</strong> {item.maxLoanTerm} tháng
                </p>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    type="link"
                    onClick={() => {
                      console.log('v');
                      if (checkFinancialIsValid())
                        openDrawer(item.loanProductId);
                      else pushNotiWarnResgisterFinancial();
                    }}
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (checkFinancialIsValid())
                        setOpenModalId(item.loanProductId);
                      else pushNotiWarnResgisterFinancial();
                    }}
                  >
                    Đăng ký vay
                  </Button>
                </div>{' '}
                <div style={{ position: 'absolute' }}>
                  {openModalId === item.loanProductId && (
                    <LoanRegistrationForm
                      loanProductName={item.nameLoanProduct}
                      loanProductId={item.loanProductId}
                      isModalOpen={openModalId === item.loanProductId}
                      loanTermLimit={item.maxLoanTerm}
                      amountLoanLimit={item.maxLoanAmount}
                      setIsModalOpen={() => setOpenModalId(null)} // Đóng modal khi xong
                    />
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
        {selectedProductId && (
          <LoanProductDetailDrawer
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            loanProductId={selectedProductId}
          />
        )}
      </Spin>
    </App>
  );
};

export default LoanListActive;
