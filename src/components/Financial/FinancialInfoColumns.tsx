import { Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API } from '@/types/financialInfo';

export const getFinancialInfoColumns = (handleDetail: (record: API.FinancialInfoItem) => void): ColumnsType<API.FinancialInfoItem> => [
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
