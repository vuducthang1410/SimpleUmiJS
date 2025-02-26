import { PageContainer } from '@ant-design/pro-components';
import { Row, Col, Form, Input, InputNumber, Select, Button } from 'antd';
import { history } from 'umi';
import { LoanProduct, LoanForm, ApplicableObjects } from '@/types/LoanProductModel';
const { Option } = Select;

const LoanProductCreatePage: React.FC = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values: LoanProduct) => {
        console.log('Dữ liệu sản phẩm vay:', values);
        history.push('/loan-products'); // Điều hướng về danh sách sau khi thêm
    };

    return (
        <PageContainer title="Tạo sản phẩm vay">
            <Button type="primary" onClick={() => history.push('/loan-product')} style={{ marginBottom: 20 }}>
                {"< Quay lại"}
            </Button>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Tên sản phẩm vay" name="nameLoanProduct" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Hạn mức vay" name="loanLimit" rules={[{ required: true, type: 'number' }]}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label="Tiện ích" name="utilities">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label="Điều kiện vay" name="loanCondition">
                    <Input.TextArea />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Hình thức vay" name="loanForm" rules={[{ required: true }]}>
                            <Select>
                                <Option value={LoanForm.SECURED_LOAN}>Vay thế chấp</Option>
                                <Option value={LoanForm.UNSECURED_LOAN}>Vay tín chấp</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Đối tượng áp dụng" name="applicableObjects" rules={[{ required: true }]}>
                            <Select>
                                <Option value={ApplicableObjects.BUSINESS_CUSTOMER}>Khách hàng doanh nghiệp</Option>
                                <Option value={ApplicableObjects.INDIVIDUAL_CUSTOMER}>Khách hàng cá nhân</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Thời hạn vay (tháng)" name="termLimit" rules={[{ required: true, type: 'number' }]}>
                    <InputNumber min={1} max={48} style={{ width: '100%' }} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Lưu sản phẩm vay
                </Button>
            </Form>

        </PageContainer>
    );
};

export default LoanProductCreatePage;
