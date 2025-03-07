import LoanInfoDetailPaymentModal from '@/components/LoanInfo/LoanInfoDetailPaymentModal';
import { LoanDetailActiveRp } from '@/types/LoanInfo';
import { getUserInfoInLocalStorage } from '@/utils/UserInfo';
import { useDispatch, useSelector } from '@umijs/max';
import { Col, Pagination, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import LoanDetailModal from '../PaymentLoan/PaymentLoanEarly';
import LoanCard from './LoanInfoDetailActiveCard';

const pageSize = 6; // Số thẻ trên mỗi trang

const LoanList: React.FC = () => {A
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);
  const { loanDetailInfoList, totalRecord } = useSelector(
    (state: any) => state.loanDetailInfo.fetchLoanDetailInfo,
  );
  const [loanInfoId, setLoanInfoId] = useState<string>('');
  const showModal = (loanInfoId: string) => {
    setLoanInfoId(loanInfoId);
    setIsModalVisible(true);
  };
  useEffect(() => {
    setLoading(true);
    const user = getUserInfoInLocalStorage();
    dispatch({
      type: 'loanDetailInfo/getLoanInfoActiveByCifCode',
      payload: {
        pageSize: pageSize,
        pageNumber: currentPage - 1,
        cifCode: user.cifCode,
      },
      callback: () => {
        setLoading(false);
      },
    });
  }, [currentPage]);
  return (
    <>
      {loading ? (
        <Spin
          size="large"
          style={{ display: 'block', textAlign: 'center', marginTop: 50 }}
        />
      ) : (
        <>
          <Row gutter={[24, 24]} justify="start">
            {loanDetailInfoList.map(
              (loan: LoanDetailActiveRp, index: number) => (
                <Col key={index} xs={24} sm={12} md={12} lg={12}>
                  <LoanCard
                    loan={loan}
                    showModal={showModal}
                    dispatch={dispatch}
                    showDetailModal={setIsModalVisibleDetail}
                  />
                </Col>
              ),
            )}
          </Row>

          {/* Phân trang */}
          {totalRecord > pageSize && (
            <Pagination
              current={currentPage}
              total={totalRecord}
              pageSize={pageSize}
              onChange={setCurrentPage}
              style={{ marginTop: 20, textAlign: 'center' }}
            />
          )}
        </>
      )}
      <LoanDetailModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        loanId={loanInfoId}
        pageSize={pageSize}
        currentPage={currentPage}
      />
      <LoanInfoDetailPaymentModal
        visible={isModalVisibleDetail}
        onClose={() => setIsModalVisibleDetail(false)}
      />
    </>
  );
};

export default LoanList;
