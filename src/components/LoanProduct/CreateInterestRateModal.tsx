import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { InterestRateRq } from '@/types/InterestRate';

interface CreateInterestRateModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    id: string;
    dispatch: any;
    setEditingRate: React.Dispatch<React.SetStateAction<any>>;
}

const CreateInterestRateModal: React.FC<CreateInterestRateModalProps> = ({ isOpen, setIsOpen, id, dispatch, setEditingRate }) => {
    const handleCreate = () => {
        setEditingRate((prev: InterestRateRq) => {
            const updatedRate = { ...prev, loanProductId: id };
            dispatch({ type: 'interestRate/createNewInterestRate', payload: { data: updatedRate, callback: () => message.info('Thêm thành công') } });
            return updatedRate;
        });
        setIsOpen(false);
    };

    return (
        <Modal title="Thêm lãi suất" open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
            <Form onFinish={handleCreate}>
                <Form.Item name="interestRate" label="Lãi suất (%)" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="minimumAmount" label="Số tiền tối thiểu">
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateInterestRateModal;
