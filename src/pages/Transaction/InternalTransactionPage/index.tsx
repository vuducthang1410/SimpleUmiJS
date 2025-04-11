import TransactionHistory from '@/components/Transaction/TransactionHistory';
import { Button, Col, message, Row, Select, Spin, Typography } from 'antd';
import React, { Suspense, useState } from 'react';
const { Title, Text } = Typography;
const { Option } = Select;
const LazyModal = React.lazy(
  () => import('@/components/Transaction/TransactionInternalModal'),
);
const InternalTransactionPage = () => {
  const [isModalTransactionInternalOpen, setIsModalTransactionInternalOpen] =
    useState(false);
  const showModal = () => {
    setIsModalTransactionInternalOpen(true);
  };

  const handleCancel = () => {
    setIsModalTransactionInternalOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 380,
        }}
      >
        <Row
          gutter={[8, 8]}
          justify="center"
          style={{ width: '100%', maxWidth: 600 }}
        >
          <Col xs={24} sm="auto">
            <label
              style={{
                padding: '10px 5px',
                fontSize: 16,
                fontWeight: 600,
                color: '#878787',
                textAlign: 'left',
                maxWidth: 600,
                width: '100%',
              }}
            >
              Giao dịch
            </label>
          </Col>
          <Col xs={24} sm="auto">
            <Button block onClick={showModal}>
              Giao dịch nội bộ
            </Button>
          </Col>
          <Col xs={24} sm="auto">
            <Button block>Giao dịch liên ngân hàng</Button>
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label
          style={{
            padding: '10px 5px',
            fontSize: 16,
            fontWeight: 600,
            color: '#878787',
            textAlign: 'left',
            maxWidth: 600,
            width: '100%',
          }}
        >
          Lịch sử giao dịch
        </label>
        <TransactionHistory />
        <Suspense fallback={<Spin />}>
          <LazyModal
            isOpen={isModalTransactionInternalOpen}
            showModal={showModal}
            handleCancel={handleCancel}
          />
        </Suspense>
        {/* <ConfirmTransactionInternalModal/> */}
      </div>
    </div>
  );
};

export default InternalTransactionPage;
