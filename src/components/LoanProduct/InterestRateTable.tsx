import React from 'react';
import { Table, Button, Switch } from 'antd';
import { LoanProductRp } from '@/types/LoanProduct';
import { useDispatch } from '@umijs/max';

interface InterestRateTableProps {
    loanProductRp: LoanProductRp;
    setIsModalCreateOpen: (open: boolean) => void;
    setIsModalUpdateOpen: (open: boolean) => void;
}

const InterestRateTable: React.FC<InterestRateTableProps> = ({ loanProductRp, setIsModalCreateOpen, setIsModalUpdateOpen }) => {
    const dispatch = useDispatch();

    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_: any, __: any, index: number) => index + 1 },
        { title: 'Lãi suất (%)', dataIndex: 'interestRate', key: 'interestRate' },
        { title: 'Đơn vị', dataIndex: 'unit', key: 'unit' },
        { title: 'Số tiền tối thiểu', dataIndex: 'minimumAmount', key: 'minimumAmount' },
        { title: 'Kỳ hạn tối thiểu', dataIndex: 'minimumLoanTerm', key: 'minimumLoanTerm' },
        { title: 'Ngày tạo', dataIndex: 'createdDate', key: 'createdDate' },
        {
            title: 'Kích hoạt',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean, record: any) => (
                <Switch checked={isActive} onChange={() => dispatch({ type: 'loan/toggleInterestRate', payload: { id: record.id } })} />
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: any) => (
                <>
                    <Button type="link" onClick={() => setIsModalUpdateOpen(true)}>Sửa</Button>
                    <Button type="link" danger>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <h3>Lãi suất</h3>
            <Button type="primary" onClick={() => setIsModalCreateOpen(true)}>Thêm lãi suất</Button>
            <Table dataSource={loanProductRp.interestRate} columns={columns} rowKey="id" />
        </>
    );
};

export default InterestRateTable;
