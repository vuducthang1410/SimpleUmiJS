import { InterestRateRq } from '@/types/InterestRate';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;
interface EditInterestRateModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    editingRate: InterestRateRq;
}
const EditInterestRateModal: React.FC<EditInterestRateModalProps> = ({ isOpen, setIsOpen, editingRate }) => (
    <Modal title="Chỉnh sửa lãi suất" open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <Form initialValues={editingRate}>
            <Form.Item name="interestRate" label="Lãi suất (%)" rules={[{ required: true }]}> <Input type="number" /> </Form.Item>
            <Form.Item name="minimumAmount" label="Số tiền tối thiểu"> <Input type="number" /> </Form.Item>
            <Form.Item name="minimumLoanTerm" label="Kỳ hạn tối thiểu"> <Input type="number" /> </Form.Item>
            <Form.Item name="unit" label="Đơn vị">
                <Select><Option value="MONTH">Tháng</Option><Option value="YEAR">Năm</Option></Select>
            </Form.Item>
            <Form.Item> <Button type="primary" htmlType="submit">Lưu</Button> </Form.Item>
        </Form>
    </Modal>
);

export default EditInterestRateModal;
