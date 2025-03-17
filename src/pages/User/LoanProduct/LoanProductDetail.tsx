import { LoanProductRp } from '@/types/LoanProduct';
import { useDispatch } from '@umijs/max';
import { Button, Card, Descriptions, Drawer, message, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import LoanRegistrationForm from '../Loan/RegisterFormModal';
import { DataCallback } from '@/types/InterestRate';
const { Title } = Typography;

interface LoanProductDetailProps {
  open: boolean;
  onClose: () => void;
  loanProductId: string;
}

export default function LoanProductDetailDrawer({
  open,
  onClose,
  loanProductId,
}: LoanProductDetailProps) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanProductResponse, setLoanProductResponse] =
    useState<LoanProductRp | null>(null);

  useEffect(() => {
    console.log("first")
    if (loanProductId) {
      console.log("first")
      console.log(loanProductId)
      dispatch({
        type: 'loanProductForUser/getLoanProductById',
        payload: { id: loanProductId, callback: setLoanProductResponse },
        callback:(response:DataCallback)=>{
            if(response.isSuccess){
                message.success(response.message)
            }else{
                message.error(response.message)
            }
        }
      });
    }
  }, [loanProductId]);

  if (!loanProductResponse) {
    return <div>Loading...</div>;
  }

  return (
    <Drawer
      title="Chi tiết sản phẩm vay"
      open={open}
      onClose={onClose}
      width={600}
    >
      <Card>
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
        <p>
          <label style={{ fontSize: 16, fontWeight: 500 }}>
            {'Điều kiện vay: '}
          </label>
          {loanProductResponse.loanCondition}
        </p>
        <p>
          <label style={{ fontSize: 16, fontWeight: 500 }}>
            {'Tiện ích sản phẩm: '}
          </label>
          {loanProductResponse.utilities}
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

        <Title level={4} style={{ marginTop: 20 }}>Lãi suất</Title>
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

        {isModalOpen && (
          <LoanRegistrationForm
            loanProductName={loanProductResponse.productName}
            loanProductId={loanProductId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loanTermLimit={loanProductResponse.termLimit}
            amountLoanLimit={loanProductResponse.loanLimit}
          />
        )}
      </Card>
    </Drawer>
  );
}
