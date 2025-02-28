import { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useModel } from '@umijs/max';
import { API } from '@/types/financialInfo';
import type { ColumnsType } from 'antd/es/table';
import { PageContainer } from '@ant-design/pro-components';

const FinancialInfo: React.FC = () => {
    const { financial, fetchList } = useModel('financial');
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            await fetchList();
            console.log('data cập nhật:', financial.list);
        };
        fetchData();
        setLoading(false)
    }, [fetchList]);


    useEffect(() => {
        console.log('data cập nhật:', financial.list);
    }, [financial.list]);



    const columns: ColumnsType<API.FinancialInfoItem> = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Thu nhập',
            dataIndex: 'income',
            key: 'income',
            align: 'center',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center',
        },
        {
            title: 'Điểm tín dụng',
            dataIndex: 'creditScore',
            key: 'creditScore',
            align: 'center',
        },
        {
            title: 'Nguồn thu nhập',
            dataIndex: 'incomeSource',
            key: 'incomeSource',
            align: 'center',
        },
        {
            title: 'Loại thu nhập',
            dataIndex: 'incomeType',
            key: 'incomeType',
            align: 'center',
        },
        {
            title: 'Tình trạng nợ',
            dataIndex: 'debtStatus',
            key: 'debtStatus',
            align: 'center',
        },
        {
            title: 'Số lượng giấy tờ',
            dataIndex: 'countLegalDocument',
            key: 'countLegalDocument',
            align: 'center',
        },
        {
            title: 'Hạn mức vay',
            dataIndex: 'amountLoanLimit',
            key: 'amountLoanLimit',
            align: 'center',
        },
        {
            title: 'Đồng ý/Xét duyệt',
            dataIndex: 'isExpired',
            key: 'isExpired',
            align: 'center',
            render: (isExpired: boolean) => (isExpired ? 'Đã duyệt' : 'Chưa duyệt'),
        },
        {
            title: 'Chi tiết',
            key: 'action',
            align: 'center',
            render: (_: any, record: API.FinancialInfoItem) => (
                <Space>
                    <Button type="primary" onClick={() => handleDetail(record)}>
                        Xem chi tiết
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDetail = (record: API.FinancialInfoItem) => {
        console.log('Chi tiết:', record);
    };

    return (
        <PageContainer>
            <Table
                columns={columns}
                dataSource={financial.list}
                loading={loading}
                rowKey={(record) => record.amountLoanLimit} // Đảm bảo ID là duy nhất
                pagination={{ total: financial.totalRecords, pageSize: 12 }}
            />
        </PageContainer>
    );
};

export default FinancialInfo;
