import LoanStatusTag from '@/components/LoanInfo/LoanStatusTag';
import { DataCallback } from '@/types/InterestRate';
import { LoanInfoHistory, LoanInfoHistoryRq } from '@/types/LoanInfo';
import { getUserInfoInLocalStorage } from '@/utils/UserInfo';
import { history, useDispatch, useSelector } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Empty,
  message,
  Pagination,
  Row,
  Select,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import './LoanHistory.css';

const { Option } = Select;

const LoanHistory: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchLoanDetailInfo } = useSelector(
    (state: any) => state.loanDetailInfo,
  );
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  useEffect(() => {
    const userInfo = getUserInfoInLocalStorage();
    if (!userInfo) return;
    const loanInfoHistoryRq: LoanInfoHistoryRq = {
      cifCode: userInfo.cifCode,
      pageNumber: currentPage - 1,
      pageSize,
      requestStatus: statusFilter,
    };
    dispatch({
      type: 'loanDetailInfo/getLoanInfoHistoryByCifCode',
      payload: { loanInfoHistoryRq },
      callback: (response: DataCallback) => {
        if (!response.isSuccess) {
          message.error(response.message);
        }
      },
    });
  }, [statusFilter, currentPage, dispatch]);

  // Hàm lọc theo trạng thái
  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '#E6A23C';
      case 'APPROVED':
        return 'green';
      case 'REJECTED':
      case 'EXPIRED':
        return 'red';
      case 'CANCEL':
        return 'blue';
      default:
        return 'black'; // Màu mặc định
    }
  };
  useEffect(() => {
    console.log(fetchLoanDetailInfo.loanInfoHistory,fetchLoanDetailInfo.filteredData);
  }, [fetchLoanDetailInfo.loanInfoHistory]);
  return (
    <div
      className="loan-history-container"
      style={{ width: '100%', height: '100%' }}
    >
      <Button onClick={() => history.back()}>{'< Quay lại'}</Button>
      <h2>Lịch sử vay vốn</h2>

      {/* Bộ lọc trạng thái */}
      <div className="filter-container" style={{ marginBottom: 10 }}>
        <Select
          value={statusFilter}
          onChange={handleFilterChange}
          style={{ width: 200 }}
        >
          <Option value="ALL">Tất cả</Option>
          <Option value="PENDING">Đang chờ duyệt</Option>
          <Option value="APPROVED">Đã duyệt</Option>
          <Option value="REJECTED">Bị từ chối</Option>
          <Option value="EXPIRED">Đã hết hạn</Option>
          <Option value="CANCEL">Đã hủy</Option>
        </Select>
      </div>

      {/* Hiển thị dữ liệu */}
      {fetchLoanDetailInfo.loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : fetchLoanDetailInfo.filteredData === 0 ? (
        <div className="empty-container">
          <Empty description="Không có khoản vay nào" />
        </div>
      ) : (
        <Row gutter={[16, 16]} className="loan-list">
          {fetchLoanDetailInfo.loanInfoHistory.map((loan: LoanInfoHistory) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              key={loan.loanDetailInfoId}
              style={{ maxWidth: '100%' }}
            >
              <Card hoverable className="loan-card">
                <div className="loan-info">
                  <h3 className="loan-title">{loan.loanProductName}</h3>
                  <p>
                    <strong>💰 Số tiền:</strong>{' '}
                    {loan.loanAmount.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>📈 Lãi suất:</strong> {loan.interestRate}%
                  </p>
                  <p>
                    <strong>📅 Thời hạn:</strong> {loan.loanTerm} tháng
                  </p>
                  <p>
                    <strong>🔖 Trạng thái yêu cầu:</strong>{' '}
                    <span style={{ color: getStatusColor(loan.requestStatus) }}>
                      {loan.requestStatus}
                    </span>
                  </p>
                  {loan.requestStatus === 'APPROVED' && (
                    <p>
                      <strong>🕒 Trạng thái khoản vay:</strong>{' '}
                      <LoanStatusTag status={loan.loanStatus} />
                    </p>
                  )}
                  <p>
                    <strong>🕒 Ngày đăng ký vay:</strong> {loan.createdDate}
                  </p>
                </div>
                <div className="loan-actions">
                  <button className="detail-button">Xem chi tiết</button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Phân trang */}
      {fetchLoanDetailInfo.filteredData > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={fetchLoanDetailInfo.filteredData}
          onChange={(e) => {
            setCurrentPage(e);
          }}
          className="pagination"
          style={{ marginTop: 10 }}
        />
      )}
    </div>
  );
};

export default LoanHistory;
