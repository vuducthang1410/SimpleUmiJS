import { Modal, Row, Col, Form, Input, InputNumber, Select, Button } from 'antd';
import { LoanProduct, LoanForm, ApplicableObjects } from '@/types/LoanProductModel';
import useLoanProductForm from '@/utils/HandleLoanProductForm';
import { useDispatch } from '@umijs/max';

const { Option } = Select;
interface DataProps {
    visible: boolean;
    onClose: () => void;
}

const LoanProductCreateModal:
    React.FC<DataProps> = ({ visible, onClose }) => {
        const dispatch = useDispatch();
        const { newLoanProduct, handleInputChange } = useLoanProductForm();
        const [form] = Form.useForm();

        const handleSubmit = (values: LoanProduct) => {
            console.log('Dữ liệu sản phẩm vay:', values);
            dispatch({
                type: 'loanProduct/createNewLoanProduct',
                payload: values
            })
            form.resetFields(); // Reset form sau khi submit
            onClose(); // Đóng modal
            dispatch({
                type: 'loanProduct/fetchLoanProducts',
                payload: { active: false, pageNumber: 0, pageSize: 10 },
            });
        };

        return (
            <Modal title="Tạo sản phẩm vay" open={visible} onCancel={onClose} footer={null} width={700}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tên sản phẩm vay" name="nameLoanProduct" rules={[{ required: true }]}>
                                <Input value={newLoanProduct.nameLoanProduct} onChange={(e) => handleInputChange('nameLoanProduct', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hạn mức vay" name="loanLimit" rules={[{ required: true, type: 'number' }]}>
                                <InputNumber min={0} style={{ width: '100%' }} value={newLoanProduct.loanLimit} onChange={(value) => handleInputChange('loanLimit', value)} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
                        <Input.TextArea value={newLoanProduct.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Tiện ích" name="utilities">
                        <Input.TextArea value={newLoanProduct.utilities} onChange={(e) => handleInputChange('utilities', e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Điều kiện vay" name="loanCondition">
                        <Input.TextArea value={newLoanProduct.loanCondition} onChange={(e) => handleInputChange('loanCondition', e.target.value)} />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Hình thức vay" name="loanForm" rules={[{ required: true }]}>
                                <Select value={newLoanProduct.loanForm} onChange={(value) => handleInputChange('loanForm', value)}>
                                    <Option value={LoanForm.SECURED_LOAN}>Vay thế chấp</Option>
                                    <Option value={LoanForm.UNSECURED_LOAN}>Vay tín chấp</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Đối tượng áp dụng" name="applicableObjects" rules={[{ required: true }]}>
                                <Select value={newLoanProduct.applicableObjects} onChange={(value) => handleInputChange('applicableObjects', value)}>
                                    <Option value={ApplicableObjects.BUSINESS_CUSTOMER}>Khách hàng doanh nghiệp</Option>
                                    <Option value={ApplicableObjects.INDIVIDUAL_CUSTOMER}>Khách hàng cá nhân</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Thời hạn vay (tháng)" name="termLimit" rules={[{ required: true, type: 'number' }]}>
                        <InputNumber min={1} max={48} style={{ width: '100%' }} value={newLoanProduct.termLimit} onChange={(value) => handleInputChange('termLimit', value)} />
                    </Form.Item>

                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={onClose} style={{ marginRight: 10 }}>Hủy</Button>
                        <Button type="primary" htmlType="submit">Lưu sản phẩm vay</Button>
                    </div>
                </Form>
            </Modal>
        );
    };

export default LoanProductCreateModal;
