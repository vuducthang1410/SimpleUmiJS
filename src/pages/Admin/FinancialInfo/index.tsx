import ApprovedFInancialInfoModal from '@/components/Financial/ApprovedFinancialInfo';
import { getFinancialInfoColumns } from '@/components/Financial/FinancialInfoColumns';
import { API } from '@/types/financialInfo';
import { DataCallback } from '@/types/InterestRate';
import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { message, Table } from 'antd';
import { useEffect, useState } from 'react';

const FinancialInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { list, totalRecords, isLoading } = useSelector(
    (state: any) => state.financialInfoAdmin,
  );
  const [selectedRecord, setSelectedRecord] =
    useState<API.FinancialInfoItem | null>(null);

  const handleDetail = (record: API.FinancialInfoItem) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('ccc');
    dispatch({
      type: 'financialInfoAdmin/fetchList',
      payload: { status: 'PENDING' },
      callback: (response: DataCallback) => {
        if (!response.isSuccess) {
          message.error(response.message);
        }
      },
    });
  }, []);

  useEffect(() => {
    console.log('data cập nhật:', list);
  }, [list]);

  return (
    <PageContainer>
      <Table
        columns={getFinancialInfoColumns(handleDetail)}
        dataSource={list}
        loading={isLoading}
        rowKey={(record) => record.amountLoanLimit}
        pagination={{ total: totalRecords, pageSize: 12 }}
      />
      <ApprovedFInancialInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
      />
    </PageContainer>
  );
};

export default FinancialInfo;
