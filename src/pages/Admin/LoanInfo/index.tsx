import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Modal, Input } from 'antd';
import { Button, message, Table } from 'antd';
import { getLoanApplicants, updateLoanDisbursementStatus } from '@/services/loan/info'; // Giả sử bạn đã định nghĩa hàm này trong dịch vụ
import { Select } from 'antd';
import { useNavigate } from '@umijs/max';
interface LoanApplicant {
    fullName: string;
    formDeftRepayment: string;
    identityCard: string;
    loanDetailInfoId: string;
    interestRate: number;
    loanAmount: string;
    loanTerm: number;
    phone: string;
    unit: string;
    createdTime: string;
    loanStatus: string;
    loanProductName: string;
}
interface loanStatus {
    value: string;
    label: string;
}
const LoanApplicants: React.FC = () => {
    const [data, setData] = useState<LoanApplicant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [loanStatusList, setLoanStatusList] = useState<loanStatus[]>([{ label: 'Chờ xét duyệt', value: 'PENDING' }, { label: 'Đã duyệt', value: 'APPROVED' }, { label: 'Từ chối', value: 'REJECTED' }]);
    const [selectedLoanStatus, setSelectedLoanStatus] = useState<loanStatus>({ label: 'Chờ xét duyệt', value: 'PENDING' });
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLoanId, setCurrentLoanId] = useState<string | null>(null);
    const [currentStatus, setCurrentStatus] = useState<'APPROVED' | 'REJECTED' | null>(null);
    const [note, setNote] = useState<string>('');
    useEffect(() => {
        loadLoanApplicants();
    }, [currentPage]);

    const loadLoanApplicants = async () => {
        setLoading(true);
        try {
            const response = await getLoanApplicants(currentPage, selectedLoanStatus.value);
            console.log(response.data.dataResponse)
            setData(response.data.dataResponse);
            setTotal(response.data.totalRecord);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu.');
        }
        setLoading(false);
    };

    const handleViewDetails = (id: string) => {
        navigate(`/loan-applicant/${id}`);
    };
    const onChange = (value: string) => {
        setSelectedLoanStatus(loanStatusList.find((item) => item.value === value) || { label: 'Chờ xét duyệt', value: 'PENDING' });
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    const showNoteModal = (id: string, status: 'APPROVED' | 'REJECTED') => {
        setCurrentLoanId(id);
        setCurrentStatus(status);
        setIsModalVisible(true);
    };
    const handleConfirmStatus = async () => {
        if (!currentLoanId || !currentStatus) return;

        try {
            await updateLoanDisbursementStatus(currentLoanId, currentStatus, note);
            message.success(`${currentStatus === 'APPROVED' ? 'Duyệt' : 'Từ chối'} khoản vay thành công!`);
            setIsModalVisible(false);
            setNote('');
            loadLoanApplicants();
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái khoản vay.');
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setNote('');
    };
    useEffect(() => {
        loadLoanApplicants()
    }, [selectedLoanStatus]);
    return (
        <PageContainer>
            <Select
                showSearch
                placeholder="Select a status"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={loanStatusList}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
            />
            <Modal
                title="Nhập lý do đồng ý/từ chối"
                open={isModalVisible}
                onOk={handleConfirmStatus}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Input.TextArea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Nhập nội dung ghi chú..."
                    rows={4}
                />
            </Modal>

            <Table
                columns={[
                    {
                        title: 'STT',
                        dataIndex: 'index',
                        render: (_, __, index) => (currentPage) * 10 + index + 1,
                        align: 'center',
                    },
                    { title: 'Họ Tên Khách Hàng', dataIndex: 'fullName', align: 'center' },
                    { title: 'Ngày Vay', dataIndex: 'createdTime', align: 'center' },
                    { title: 'Phương thức thanh toán', dataIndex: 'formDeftRepayment', align: 'center' },
                    { title: 'CCCD', dataIndex: 'identityCard', align: 'center' },
                    { title: 'Số Tiền Vay', dataIndex: 'loanAmount', align: 'center' },
                    { title: 'Sản phẩm vay', dataIndex: 'loanProductName', align: 'center' },
                    { title: 'Số Tháng Vay', dataIndex: 'loanTerm', align: 'center' },
                    { title: 'Lãi Suất', dataIndex: 'interestRate', align: 'center' },
                    { title: 'Đơn Vị lãi xuất', dataIndex: 'unit', align: 'center' },

                    {
                        title: selectedLoanStatus.value === 'PENDING' ? 'Thao Tác' : 'Trạng Thái Vay',
                        render: (_, record) => (
                            selectedLoanStatus.value === 'PENDING' ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: 'green', borderColor: 'green', marginRight: 8 }}
                                        onClick={() => showNoteModal(record.loanDetailInfoId, 'APPROVED')}
                                    >
                                        Đồng Ý
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => showNoteModal(record.loanDetailInfoId, 'REJECTED')}
                                    >
                                        Từ Chối
                                    </Button>
                                </div>
                            ) : (
                                <span style={{ color: record.loanStatus === "ACTIVE" ? "green" : "red" }}>
                                    {record.loanStatus}
                                </span>

                            )
                        ),
                        align: 'center',
                    },

                    {
                        title: 'Chi Tiết',
                        dataIndex: 'viewDetails',
                        render: (_, record) => (
                            <Button
                                type="link"
                                onClick={() => handleViewDetails(record.identityCard)}
                            >
                                Xem Chi Tiết
                            </Button>
                        ),
                        align: 'center',
                    },
                ]}
                dataSource={data}
                loading={loading}
                rowKey="loanDetailInfoId"
                pagination={{
                    current: currentPage + 1,
                    pageSize: 10,
                    total: total,
                    onChange: (page) => setCurrentPage(page),
                }}
                scroll={{ x: 1000 }}
            />
        </PageContainer >
    );
};

export default LoanApplicants;
