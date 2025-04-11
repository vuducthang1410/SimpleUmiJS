import { DataCallback } from '@/types/InterestRate';
import { ApplicableObjects, LoanForm, LoanProduct } from '@/types/LoanProduct';
import useLoanProductForm from '@/utils/HandleLoanProductForm';
import { useDispatch } from '@umijs/max';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from 'antd';

const { Option } = Select;

interface DataProps {
  visible: boolean;
  onClose: () => void;
}

const LoanProductCreateModal: React.FC<DataProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { newLoanProduct, handleInputChange } = useLoanProductForm();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    dispatch({
      type: 'loanProduct/createNewLoanProduct',
      payload: newLoanProduct,
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
    form.resetFields();
    onClose();
    dispatch({
      type: 'loanProduct/fetchLoanProducts',
      payload: { active: false, pageNumber: 0, pageSize: 10 },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
  };

  return (
    <Modal
      title="Tạo sản phẩm vay"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên sản phẩm vay"
              name="nameLoanProduct"
              rules={[{ required: true }]}
            >
              <Input
                value={newLoanProduct.nameLoanProduct}
                onChange={(e) =>
                  handleInputChange('nameLoanProduct', e.target.value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Hạn mức vay"
              name="loanLimit"
              rules={[{ required: true, type: 'number' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                value={newLoanProduct.loanLimit}
                onChange={(value) => handleInputChange('loanLimit', value)}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* CKEditor cho phần Mô tả */}
        <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
          <CKEditor
            editor={ClassicEditor}
            data={newLoanProduct.description}
            onChange={(event, editor) => {
              const data = editor.getData(); // Lấy dữ liệu dạng string
              console.log("Dữ liệu CKEditor:", data); // Kiểm tra output
              handleInputChange("description", data); // Lưu vào state
            }}
          />
        </Form.Item>

        {/* CKEditor cho phần Tiện ích */}
        <Form.Item label="Tiện ích" name="utilities">
          <CKEditor
            editor={ClassicEditor}
            data={newLoanProduct.utilities}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleInputChange('utilities', data);
            }}
          />
        </Form.Item>

        {/* CKEditor cho phần Điều kiện vay */}
        <Form.Item label="Điều kiện vay" name="loanCondition">
          <CKEditor
            editor={ClassicEditor}
            data={newLoanProduct.loanCondition}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleInputChange('loanCondition', data);
            }}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Hình thức vay"
              name="loanForm"
              rules={[{ required: true }]}
            >
              <Select
                value={newLoanProduct.loanForm}
                onChange={(value) => handleInputChange('loanForm', value)}
              >
                <Option value={LoanForm.SECURED_LOAN}>Vay thế chấp</Option>
                <Option value={LoanForm.UNSECURED_LOAN}>Vay tín chấp</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Đối tượng áp dụng"
              name="applicableObjects"
              rules={[{ required: true }]}
            >
              <Select
                value={newLoanProduct.applicableObjects}
                onChange={(value) =>
                  handleInputChange('applicableObjects', value)
                }
              >
                <Option value={ApplicableObjects.BUSINESS_CUSTOMER}>
                  Khách hàng doanh nghiệp
                </Option>
                <Option value={ApplicableObjects.INDIVIDUAL_CUSTOMER}>
                  Khách hàng cá nhân
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Thời hạn vay (tháng)"
          name="termLimit"
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber
            min={1}
            max={48}
            style={{ width: '100%' }}
            value={newLoanProduct.termLimit}
            onChange={(value) => handleInputChange('termLimit', value)}
          />
        </Form.Item>

        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 10 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu sản phẩm vay
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default LoanProductCreateModal;
