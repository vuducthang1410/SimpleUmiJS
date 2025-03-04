import { LoanProductRp } from '@/types/LoanProduct';
import { history, useDispatch, useParams } from '@umijs/max';
import { App, Button, Card, Descriptions, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import LoanRegistrationForm from '../Loan/RegisterFormModal';

const { Title } = Typography;

export default function LoanProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanProductResponse, setLoanProductResponse] =
    useState<LoanProductRp | null>(null);

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'loanProductForUser/getLoanProductById',
        payload: { id: id, callback: setLoanProductResponse },
      });
    }
  }, [id]);

  if (!loanProductResponse) {
    return <div>Loading...</div>;
  }

  return (
    <App style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
      <Card>
        <Button style={{ marginBottom: 15 }} onClick={() => history.back()}>
          {'< Quay lại'}
        </Button>
        <img
          src={loanProductResponse.imgUrl}
          alt={loanProductResponse.productName}
          style={{
            width: '100%',
            maxHeight: 300,
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
        <Title level={2} style={{ marginTop: 20 }}>
          {loanProductResponse.productName}
        </Title>
        <p>
          <label style={{ fontSize: 16, fontWeight: 500 }}>
            {'Mô tả sản phẩm: '}
          </label>
          {loanProductResponse.productDescription}
        </p>
        <Descriptions title="Thông tin chi tiết" bordered column={1}>
          <Descriptions.Item label="Hình thức vay">
            {loanProductResponse.formLoan}
          </Descriptions.Item>
          <Descriptions.Item label="Hạn mức vay">
            {loanProductResponse.loanLimit}
          </Descriptions.Item>
          <Descriptions.Item label="Kỳ hạn vay">
            {loanProductResponse.termLimit} tháng
          </Descriptions.Item>
          <Descriptions.Item label="Đối tượng áp dụng">
            {loanProductResponse.applicableObjects}
          </Descriptions.Item>
        </Descriptions>

        <Title level={3} style={{ marginTop: 20 }}>
          Lãi suất
        </Title>
        <Table
          dataSource={loanProductResponse.interestRate}
          rowKey="id"
          pagination={false}
          columns={[
            {
              title: 'Lãi suất (%)',
              dataIndex: 'interestRate',
              key: 'interestRate',
              align: 'center',
            },
            {
              title: 'Đơn vị',
              dataIndex: 'unit',
              key: 'unit',
              align: 'center',
            },
            {
              title: 'Số tiền tối thiểu',
              dataIndex: 'minimumAmount',
              key: 'minimumAmount',
              align: 'right',
            },
            {
              title: 'Kỳ hạn tối thiểu',
              dataIndex: 'minimumLoanTerm',
              key: 'minimumLoanTerm',
              align: 'center',
            },
          ]}
        />
        <Button
          type="primary"
          style={{ width: '100%', height: '3em', marginTop: 15 }}
          onClick={() => setIsModalOpen(true)}
        >
          Đăng ký vay vốn
        </Button>
        <div style={{ position: 'absolute' }}>
          {isModalOpen == true && (
            <LoanRegistrationForm
              loanProductName={loanProductResponse.productName}
              loanProductId=""
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              loanTermLimit={loanProductResponse.termLimit}
              amountLoanLimit={loanProductResponse.loanLimit}
            />
          )}
        </div>
      </Card>
    </App>
  );
}
