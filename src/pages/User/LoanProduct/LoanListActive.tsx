import { LoanProductForUserRp } from '@/types/LoanProduct';
import { history, useDispatch, useSelector } from '@umijs/max';
import { Button, Card, List, Spin, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import LoanRegistrationForm from '../Loan/RegisterFormModal';
const LoanListActive: React.FC = () => {
  const dispatch = useDispatch();
  const { loanProductList, loading } = useSelector(
    (state: any) => state.loanProductForUser,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateToDetail = (id: string) => {
    history.push(`${'/loan-product/' + id}`);
  };

  useEffect(() => {
    dispatch({
      type: 'loanProductForUser/fetchLoanProducts',
      payload: { pageNumber: 0, pageSize: 10 },
    });
  }, [dispatch]);

  useEffect(() => {
    console.log('data', loanProductList);
  }, [loanProductList]);
  return (
    <>
      <Spin spinning={loading}>
        <List
          grid={{ gutter: 16, column: 3 }}
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
                style={{ width: '90%' }}
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
                  <Button onClick={() => navigateToDetail(item.loanProductId)}>
                    Xem chi tiết
                  </Button>
                  <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Đăng ký vay
                  </Button>
                </div>      <div style={{ position: 'absolute' }}>
                  {isModalOpen == true && (
                    <LoanRegistrationForm
                      loanProductName={item.nameLoanProduct}
                      loanProductId={item.loanProductId}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Spin>

    </>
  );
};

export default LoanListActive;
