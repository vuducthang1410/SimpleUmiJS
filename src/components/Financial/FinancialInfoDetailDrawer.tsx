import { FinancialInfoDetailRp } from '@/types/financialInfo';
import request from '@/utils/request';
import APIConfig from '@/utils/URL';
import {
  CalendarOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Divider,
  Drawer,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
const { Title, Text } = Typography;
interface FinancialInfoDrawerProps {
  open: boolean;
  onClose: () => void;
  financialInfoId: string;
}

const FinancialInfoDrawer: React.FC<FinancialInfoDrawerProps> = ({
  open,
  onClose,
  financialInfoId,
}) => {
  const [data, setData] = useState<FinancialInfoDetailRp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await request<{
          data: FinancialInfoDetailRp;
          message: string;
          status: string;
        }>(
          APIConfig.LOAN_URL +
            `/financial-info/individual-customer/get-detail-info/${financialInfoId}`,
          {
            method: 'GET',
            headers: {
              accept: '*/*',
              transactionId: '1294e802-5c3f-445a-9778-5d9e0c959dba',
            },
          },
        );

        if (response.status === '00000') {
          setData(response.data);
        } else {
          setError(response.message || 'Error fetching data');
        }
      } catch (err) {
        setError('Failed to fetch financial information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, financialInfoId]);

  return (
    <Drawer
      title="Thông Tin Tài Chính"
      placement="right"
      onClose={onClose}
      open={open}
      width={520}
    >
      {loading ? (
        <Spin
          size="large"
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        />
      ) : data ? (
        <div>
          <div>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item
                label={
                  <>
                    <DollarCircleOutlined /> Thu nhập
                  </>
                }
              >
                <Text strong>
                  {data.income}
                  {data.unit === 'MONTH' ? '/tháng' : '/năm'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CreditCardOutlined /> Điểm tín dụng
                  </>
                }
              >
                <Tag color="blue">{data.creditScore}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Nguồn thu nhập">
                {data.incomeSource}
              </Descriptions.Item>
              <Descriptions.Item label="Loại thu nhập">
                {data.incomeType}
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng nợ">
                <Tag
                  color={data.debtStatus === 'No bad debt' ? 'green' : 'red'}
                >
                  {data.debtStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái yêu cầu">
                <Tag
                  color={data.requestStatus === 'PENDING' ? 'orange' : 'blue'}
                >
                  {data.requestStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <DollarCircleOutlined /> Hạn mức vay
                  </>
                }
              >
                <Text strong>{data.amountLoanLimit}</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined /> Ngày hết hạn
                  </>
                }
              >
                {data.expiredDate}
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Tài liệu liên quan */}
          {data.legalDocumentRpList.length > 0 && (
            <>
              <Divider />
              <Title level={5}>
                <FileTextOutlined /> Tài liệu liên quan
              </Title>
              <div
                style={{ maxHeight: 200, overflowY: 'auto', paddingRight: 10 }}
              >
                {data.legalDocumentRpList.map((doc: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <FileTextOutlined
                      style={{ fontSize: 18, marginRight: 8, color: '#1890ff' }}
                    />
                    <Text>{doc.description}</Text>
                    <Button
                      type="link"
                      href={doc.imageBase64}
                      target="_blank"
                      style={{ marginLeft: 'auto' }}
                    >
                      Xem tài liệu
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Không có dữ liệu.</p>
      )}
    </Drawer>
  );
};

export default FinancialInfoDrawer;
