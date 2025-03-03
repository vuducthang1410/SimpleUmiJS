import React from 'react';
import { Card, List, Typography, Tag } from 'antd';
import { history, useDispatch } from '@umijs/max';
interface LoanProduct {
  id: number;
  name: string;
  image: string;
  minInterestRate: number;
  maxInterestRate: number;
  maxLoanAmount: number;
  maxLoanTerm: number;
}

const loanProducts: LoanProduct[] = [
  {
    id: 1,
    name: 'Vay Tiêu Dùng',
    image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-54.png',
    minInterestRate: 6.5,
    maxInterestRate: 10.5,
    maxLoanAmount: 500000000,
    maxLoanTerm: 60,
  },
  {
    id: 2,
    name: 'Vay Mua Nhà',
    image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-54.png',
    minInterestRate: 5.0,
    maxInterestRate: 8.5,
    maxLoanAmount: 2000000000,
    maxLoanTerm: 240,
  },
  {
    id: 3,
    name: 'Vay Mua Xe',
    image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-54.png',
    minInterestRate: 7.0,
    maxInterestRate: 9.0,
    maxLoanAmount: 800000000,
    maxLoanTerm: 84,
  },
  {
    id: 4,
    name: 'Vay Kinh Doanh',
    image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-54.png',
    minInterestRate: 6.8,
    maxInterestRate: 12.0,
    maxLoanAmount: 3000000000,
    maxLoanTerm: 120,
  },
];

const LoanListActive: React.FC = () => {

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={loanProducts}
      renderItem={(item: LoanProduct) => (
        <List.Item>
          <Card
            hoverable
            cover={<img alt={item.name} src={item.image} style={{ height: 150, objectFit: 'cover' }} />}
            onClick={()=>{
              history.push(`${'/loan-product/'+item.id}`)
            }}
          >
            <Typography.Title level={4}>{item.name}</Typography.Title>
            <p>
              <strong>Lãi suất:</strong>{' '}
              <Tag color="green">{item.minInterestRate}%</Tag> -{' '}
              <Tag color="red">{item.maxInterestRate}%</Tag>
            </p>
            <p>
              <strong>Số tiền tối đa:</strong> {item.maxLoanAmount.toLocaleString()} VND
            </p>
            <p>
              <strong>Thời hạn tối đa:</strong> {item.maxLoanTerm} tháng
            </p>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default LoanListActive;
