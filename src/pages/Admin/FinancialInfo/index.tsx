import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useModel } from '@umijs/max';
import { API } from '@/types/financialInfo';
import { PageContainer } from '@ant-design/pro-components';
import { getFinancialInfoColumns } from '@/components/Financial/FinancialInfoColumns';

const FinancialInfo: React.FC = () => {
    const { financial, fetchList } = useModel('financial');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            await fetchList();
            console.log('data cập nhật:', financial.list);
        };
        fetchData();
        setLoading(false);
    }, [fetchList]);

    useEffect(() => {
        console.log('data cập nhật:', financial.list);
    }, [financial.list]);

    const handleDetail = (record: API.FinancialInfoItem) => {
        console.log('Chi tiết:', record);
    };

    return (
        <PageContainer>
            <Table
                columns={getFinancialInfoColumns(handleDetail)}
                dataSource={financial.list}
                loading={loading}
                rowKey={(record) => record.amountLoanLimit} // Đảm bảo ID là duy nhất
                pagination={{ total: financial.totalRecords, pageSize: 12 }}
            />
        </PageContainer>
    );
};

export default FinancialInfo;
