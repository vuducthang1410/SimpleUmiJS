import React, { useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LoanProductRp } from '@/types/LoanProductModel';
import { NotificationType } from '@/types/NotificationType';
import { history, useDispatch } from '@umijs/max';

interface LoanProductTableProps {
    data: LoanProductRp[];
    loading: boolean;
    openNotificationWithIcon: (type: NotificationType, title: string, description: string) => void;
}

const LoanProductTable: React.FC<LoanProductTableProps> = ({ data, loading, openNotificationWithIcon }) => {
    const dispatch = useDispatch();
    const handleToggleProductStatus = (id: string) => {
        dispatch({ type: 'loanProduct/activedLoanProduct', payload: { id: id, isUnActive: true } });
    };
    const handleViewDetail = async (record: LoanProductRp) => {
        history.push(`/loan-product/detail/${record.productId}`, record.productId);
    };
    const handleDelete = (record: LoanProductRp) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa lãi suất này không?',
            onOk: () => {
                dispatch({
                    type: 'loanProduct/deleteLoanProductById',
                    payload: { id: record.productId }
                })
                openNotificationWithIcon(NotificationType.success, "Xóa sản phẩm thành công", `Đã xóa sản phẩm ${record.productName}`);
            },
        });

    };
    const columns: ColumnsType<LoanProductRp> = [
        { title: 'STT', dataIndex: 'index', key: 'index', render: (_, __, index) => index + 1 },
        { title: 'Tên Sản Phẩm', dataIndex: 'productName', key: 'productName' },
        { title: 'Loại Hình Vay', dataIndex: 'formLoan', key: 'formLoan' },
        { title: 'Hạn Mức Vay', dataIndex: 'loanLimit', key: 'loanLimit' },
        { title: 'Thời Hạn Vay', dataIndex: 'termLimit', key: 'termLimit' },
        { title: 'Đối Tượng Áp Dụng', dataIndex: 'applicableObjects', key: 'applicable' },
        { title: 'Ngày Tạo', dataIndex: 'createdDate', key: 'createdDate' },

        {
            title: 'Thao Tác',
            render: (_, record) => ((record.isActive == false) ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'blue', borderColor: 'blue', marginRight: 8 }}
                        onClick={() => alert(`Chỉnh sửa sản phẩm: ${record.productName}`)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'red', borderColor: 'red', marginRight: 8 }}
                        onClick={() => handleDelete(record)}
                    >
                        Xóa
                    </Button>
                </div> :
                <Button
                    type="primary"
                    danger
                    onClick={() => handleToggleProductStatus(record.productId)}
                >
                    Ngừng kích hoạt
                </Button>

            ),
            align: 'center',
        }, {
            title: 'Xem chi tiết',
            key: 'action',
            render: (record: LoanProductRp) => (
                <Button type="link" onClick={() => handleViewDetail(record)}>Chi tiết</Button>
            ),
        },
    ];


    return <Table columns={columns} dataSource={data} rowKey="productId" loading={loading} pagination={{ pageSize: 10 }
    } />;
};

export default LoanProductTable;
