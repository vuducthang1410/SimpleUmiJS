import { DataCallback } from '@/types/InterestRate';
import { LoanProductForUserRp } from '@/types/LoanProduct';
import { useDispatch, useSelector } from '@umijs/max';
import {
  App,
  Button,
  Card,
  List,
  message,
  Select,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import LoanRegistrationForm from '../Loan/RegisterFormModal';
import LoanProductDetailDrawer from './LoanProductDetail';
const { Option } = Select;
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
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const checkFinancialIsValid = () =>
    financialInfoDetail &&
    Object.keys(financialInfoDetail).length > 0 &&
    financialInfoDetail.financialInfoId;
  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  const pushNotiWarnResgisterFinancial = () => {
    message.warning('Vui lòng đăng ký thông tin tài chính để tiếp tục');
  };
  useEffect(() => {
    dispatch({
      type: 'loanProductForUser/fetchLoanProducts',
      payload: { pageNumber: 0, pageSize: 10, applicableObject: statusFilter },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
  }, [statusFilter]);

  useEffect(() => {
    console.log('data', loanProductList);
  }, [loanProductList]);

  return (
    <App>
      <Spin spinning={loading}>
        {' '}
        {/* Bộ lọc trạng thái */}
        <div className="filter-container" style={{ marginBottom: 10 }}>
          <Select
            value={statusFilter}
            onChange={handleFilterChange}
            style={{ width: 200 }}
          >
            <Option value="ALL">Tất cả sản phẩm</Option>
            <Option value="BUSINESS_CUSTOMER">Dành cho doanh nghiệp</Option>
            <Option value="INDIVIDUAL_CUSTOMER">Dành cho cá nhân</Option>
          </Select>
        </div>
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
                  <strong>Đối tượng áp dụng:</strong> {item.applicableObject}
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
