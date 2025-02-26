import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoanProduct } from '@/services/LoanProduct/loanProduct';

interface LoanProductTableProps {
    data: LoanProduct[];
    loading: boolean;
}

const LoanProductTable: React.FC<LoanProductTableProps> = ({ data, loading }) => {
    const handleViewDetail = (record: LoanProduct) => {
        alert(`Chi tiết sản phẩm: ${record.productName}\nHạn mức: ${record.loanLimit} đ`);
    };
    const columns: ColumnsType<LoanProduct> = [
        { title: 'STT', dataIndex: 'index', key: 'index', render: (_, __, index) => index + 1 },
        { title: 'Tên Sản Phẩm', dataIndex: 'productName', key: 'productName' },
        { title: 'Loại Hình Vay', dataIndex: 'formLoan', key: 'formLoan' },
        { title: 'Hạn Mức Vay', dataIndex: 'loanLimit', key: 'loanLimit' },
        { title: 'Thời Hạn Vay', dataIndex: 'termLimit', key: 'termLimit' },
        { title: 'Ngày Tạo', dataIndex: 'createdDate', key: 'createdDate' },
        {
            title: 'Xem chi tiết',
            key: 'action',
            render: (record: LoanProduct) => (
                <Button type="link" onClick={() => handleViewDetail(record)}>Chi tiết</Button>
            ),
        },
    ];


    return <Table columns={columns} dataSource={data} rowKey="productId" loading={loading} pagination={{ pageSize: 10 }} />;
};

export default LoanProductTable;
