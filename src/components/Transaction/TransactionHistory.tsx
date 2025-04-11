import { TransactionHistoryRp } from '@/types/Transaction';
import { truncateText } from '@/utils/format';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Col, List, Row, Typography } from 'antd';
import React, { useEffect } from 'react';

const { Text } = Typography;

interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  type: 'send' | 'receive';
  content: string;
  amount: number;
}
const TransactionHistory: React.FC = () => {
  const { fetchFinancialInfo } = useSelector(
    (state: any) => state.financialInfo,
  );
  const { historyTransaction } = useSelector((state: any) => state.transaction);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchFinancialInfo.financialInfoDetail.bankingAccountNumber)
      dispatch({
        type: 'transaction/getTransactionHistory',
        payload: {
          pageSize: 12,
          pageNumber: 0,
          accountBankingNumber:
            fetchFinancialInfo.financialInfoDetail.bankingAccountNumber,
        },
      });
  }, [fetchFinancialInfo]);
  useEffect(() => {
    console.log(historyTransaction);
  }, [historyTransaction]);
  return (
    <div style={{ maxWidth: 600, margin: 'auto', width: '100%' }}>
      <List
        dataSource={historyTransaction}
        renderItem={(item: TransactionHistoryRp) => (
          <List.Item style={{ padding: '5px 5px', border: 0 }}>
            <Card
              style={{ width: '100%' }}
              bodyStyle={{ padding: '15px', paddingTop: 20, paddingBottom: 20 }}
            >
              <Row justify="space-between" align="middle" gutter={[8, 8]} wrap>
                {/* Cột 1: Icon */}
                <Col xs={2} sm={3} style={{ textAlign: 'center' }}>
                  {!item.isTransfer ? (
                    <ArrowLeftOutlined style={{ fontSize: 20, color: 'red' }} />
                  ) : (
                    <ArrowRightOutlined
                      style={{ fontSize: 20, color: 'green' }}
                    />
                  )}
                </Col>

                {/* Cột 2: Nội dung + Thời gian */}
                <Col xs={10} sm={10}>
                  <Text
                    strong
                    title={item.description}
                    style={{ display: 'block', marginBottom: 5 }}
                  >
                    {truncateText(item.description || '', 26)}
                  </Text>

                  <Text
                    type="secondary"
                    style={{ display: 'block', fontSize: 12 }}
                  >
                    {item.dateCreated}
                  </Text>
                </Col>

                {/* Cột 3: Số tiền + Mã GD (Luôn bên dưới) */}
                <Col xs={14} sm={11} style={{ textAlign: 'right' }}>
                  <div>
                    <Text
                      strong
                      style={{
                        fontSize: 14,
                        color: !item.isTransfer ? 'red' : 'green',
                      }}
                    >
                      {!item.isTransfer ? '-' : '+'}
                      {item.amount.toLocaleString()} VNĐ
                    </Text>
                  </div>
                  <div>
                    <Text
                      type="secondary"
                      style={{ fontSize: 12, fontStyle: 'italic' }}
                    >
                      Mã GD: {item.id}
                    </Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TransactionHistory;
