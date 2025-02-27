import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, Select, Switch, message } from 'antd';
import { LoanProduct, LoanProductRp } from '@/types/LoanProductModel';
import { useModel, useParams } from '@umijs/max';
import { InterestRate, InterestRateRq } from '@/types/InterestRate';
import { App } from 'antd';
const { Option } = Select;

interface Props {
    idLoanProduct: string;
}

const LoanProductDetail: React.FC<Props> = ({ idLoanProduct }) => {
    const { getLoanProductById } = useModel('loanProduct');
    const { createNewInterestRate } = useModel('interestRate');
    const { id } = useParams<{ id: string }>();
    const [loanProductRp, setLoanProductRp] = useState<LoanProductRp | null>(null);
    const [editingRate, setEditingRate] = useState<InterestRateRq>({ loanProductId: '', interestRate: 0, unit: 'MONTH', minimumAmount: 0, minimumLoanTerm: 0 });
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const handleBack = () => {
        history.back();
    };

    const handleToggleProductStatus = () => {
        // dispatch({ type: 'loan/toggleProductStatus', payload: { id } });
    };
    const handleEdit = (rate: InterestRate) => {
        setIsModalUpdateOpen(true);
    };
    const handleCreate = async () => {
        if (!id || id === '') {
            message.error('Không tìm thấy sản phẩm vay');
            return;
        }

        setEditingRate(prev => {
            const updatedRate = { ...prev, loanProductId: id };

            // Gọi API sau khi state đã cập nhật
            createNewInterestRate(updatedRate).then(() => {
                loadData(updatedRate.loanProductId);
            });

            return updatedRate;
        });

        setIsModalCreateOpen(false);
    };

    const handleDelete = (rateId: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa lãi suất này không?',
            onOk: () => {
                message.success('Đã xóa lãi suất thành công!');
            },
        });
    };
    const loadData = async (id: string) => {
        if (id)
            await getLoanProductById(id).then((rp) => {
                if (rp)
                    setLoanProductRp(rp.data);
                else
                    message.error('Không tìm thấy sản phẩm vay');
            });
    }
    useEffect(() => {
        if (id) {
            console.log(id)
            loadData(id);
        }
    }, [id]);
    const handleSaveEdit = (values: any) => {
        // dispatch({ type: 'loan/updateInterestRate', payload: { ...values, id: editingRate?.id } });
        message.success('Cập nhật lãi suất thành công!');
        setIsModalUpdateOpen(false);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Lãi suất (%)',
            dataIndex: 'interestRate',
            key: 'interestRate',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Số tiền tối thiểu',
            dataIndex: 'minimumAmount',
            key: 'minimumAmount',
        },
        {
            title: 'Ngày hiệu lực',
            dataIndex: 'dateActive',
            key: 'dateActive',
        },
        {
            title: 'Kỳ hạn tối thiểu',
            dataIndex: 'minimumLoanTerm',
            key: 'minimumLoanTerm',
        },
        {
            title: 'Kích hoạt',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: string, record: InterestRate) => (
                <Switch
                    checked={isActive === 'true'}
                // onChange={() => dispatch({ type: 'loan/toggleInterestRate', payload: { id: record.id } })}
                />
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: InterestRate) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <App>
            <Card title="Chi tiết sản phẩm vay" extra={<Button onClick={handleBack}>Quay lại</Button>}>
                {loanProductRp && (
                    <>
                        <p><strong>Tên sản phẩm:</strong> {loanProductRp.productName}</p>
                        <p><strong>Hạn mức vay:</strong> {loanProductRp.loanLimit}</p>
                        <p><strong>Hạn mức kỳ hạn:</strong> {loanProductRp.termLimit} tháng</p>
                        <p><strong>Hình thức vay:</strong> {loanProductRp.formLoan}</p>
                        {/* <img src={loanProductRp.productUrlImage} alt="Loan Product" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} /> */}

                        <h3>Lãi suất</h3><Button type='primary' onClick={() => setIsModalCreateOpen(true)}>Thêm lãi suất</Button>
                        <Table dataSource={loanProductRp.interestRate} columns={columns} rowKey="id" />


                        <Button type="primary" onClick={handleToggleProductStatus} style={{ marginTop: '16px' }}>
                            {loanProductRp.isActive ? 'Hủy kích hoạt' : 'Kích hoạt sản phẩm'}
                        </Button>
                    </>
                )}

                <Modal title={`Thêm lãi lãi suất cho ${loanProductRp?.productName}`} open={isModalCreateOpen} onCancel={() => setIsModalCreateOpen(false)} footer={null}>
                    <Form initialValues={editingRate} onFinish={handleCreate}
                        onValuesChange={(changedValues, allValues) => setEditingRate(allValues)}
                    >
                        <Form.Item name="interestRate" label="Lãi suất (%)" rules={[{ required: true, message: 'Vui lòng nhập lãi suất' }]}>
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item name="minimumAmount" label="Số tiền tối thiểu">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="minimumLoanTerm" label="Kỳ hạn tối thiểu">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="unit" label="Đơn vị">
                            <Select>
                                <Option value="MONTH">Tháng</Option>
                                <Option value="YEAR">Năm</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Lưu</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="Chỉnh sửa lãi suất" open={isModalUpdateOpen} onCancel={() => setIsModalUpdateOpen(false)} footer={null}>
                    <Form initialValues={editingRate} onFinish={handleSaveEdit}>
                        <Form.Item name="interestRate" label="Lãi suất (%)" rules={[{ required: true, message: 'Vui lòng nhập lãi suất' }]}>
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item name="minimumAmount" label="Số tiền tối thiểu">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="minimumLoanTerm" label="Kỳ hạn tối thiểu">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="unit" label="Đơn vị">
                            <Select>
                                <Option value="MONTH">Tháng</Option>
                                <Option value="YEAR">Năm</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Lưu</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </App>

    );
};
export default LoanProductDetail;
