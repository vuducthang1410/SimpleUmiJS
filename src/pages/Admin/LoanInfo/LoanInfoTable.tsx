import React from 'react';
import { Table, Button } from 'antd';
import { LoanApplicant } from '@/types/LoanInfo';
import { useDispatch } from '@umijs/max';

interface LoanTableProps {
    data: LoanApplicant[];
    loading: boolean;
    currentPage: number;
    total: number;
    selectedLoanStatus: string;
    onPageChange: (page: number) => void;
    onViewDetails: (id: string) => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

const LoanTable: React.FC<LoanTableProps> = ({
    data, loading, currentPage, total, selectedLoanStatus, onPageChange, onViewDetails, onApprove, onReject
}) => {
    console.log('LoanTable received data:', data);
    const columns = [
        { title: 'STT', dataIndex: 'index', render: (_: any, __: any, index: number) => currentPage * 10 + index + 1, align: 'center' as const },
        { title: 'Họ Tên Khách Hàng', dataIndex: 'fullName', align: 'center' as const },
        { title: 'Ngày Đăng Ký Vay', dataIndex: 'createdTime', align: 'center' as const },
        { title: 'CCCD', dataIndex: 'identityCard', align: 'center' as const },
        { title: 'Số Tiền Vay', dataIndex: 'loanAmount', align: 'center' as const },
        {
            title: selectedLoanStatus === 'PENDING' ? 'Thao Tác' : 'Trạng Thái Vay',
            render: (_: any, record: LoanApplicant) =>
                selectedLoanStatus === 'PENDING' ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" style={{ marginRight: 8 }} onClick={() => onApprove(record.loanDetailInfoId)}>Đồng Ý</Button>
                        <Button type="primary" danger onClick={() => onReject(record.loanDetailInfoId)}>Từ Chối</Button>
                    </div>
                ) : (
                    <span style={{ color: record.loanStatus === 'ACTIVE' ? 'green' : 'red' }}>
                        {record.loanStatus}
                    </span>
                ),
            align: 'center' as const,
        },
        {
            title: 'Chi Tiết',
            dataIndex: 'viewDetails',
            render: (_: any, record: LoanApplicant) => <Button type="link" onClick={() => onViewDetails(record.identityCard)}>Xem Chi Tiết</Button>,
            align: 'center' as const,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="loanDetailInfoId"
            pagination={{ current: currentPage + 1, pageSize: 10, total, onChange: onPageChange }}
        />
    );
};

export default LoanTable;
