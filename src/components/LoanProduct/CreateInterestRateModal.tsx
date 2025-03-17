import { DataCallback, InterestRateRq } from '@/types/InterestRate';
import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';

interface CreateInterestRateModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  id: string;
  dispatch: any;
  setEditingRate: React.Dispatch<React.SetStateAction<InterestRateRq>>;
}

const CreateInterestRateModal: React.FC<CreateInterestRateModalProps> = ({
  isOpen,
  setIsOpen,
  id,
  dispatch,
  setEditingRate,
}) => {
  const handleCreate = () => {
    setEditingRate((prev: InterestRateRq) => {
      const updatedRate = { ...prev, loanProductId: id };
      dispatch({
        type: 'interestRate/createNewInterestRate',
        payload: {
          data: updatedRate,
        },
        callback:(response:DataCallback)=>{
            if(response.isSuccess){
                message.success(response.message)
            }else{
                message.error(response.message)
            }
        }
      });
      return updatedRate;
    });
    setIsOpen(false);
  };

  return (
    <Modal
      title="Thêm lãi suất"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <Form onFinish={handleCreate}>
        <Form.Item
          name="interestRate"
          label="Lãi suất (%)"
          rules={[{ required: true }]}
        >
          <Input
            type="number"
            onChange={(e) =>
              setEditingRate((prev: InterestRateRq) => ({
                ...prev,
                interestRate: e.target.value ? Number(e.target.value) : 0,
              }))
            }
          />
        </Form.Item>
        <Form.Item name="minimumAmount" label="Số tiền tối thiểu">
          <Input
            type="number"
            onChange={(e) =>
              setEditingRate((prev: InterestRateRq) => ({
                ...prev,
                minimumAmount: e.target.value ? Number(e.target.value) : 0,
              }))
            }
          />
        </Form.Item>
        <Form.Item name="minimumLoanTerm" label="Kỳ hạn tối thiểu">
          <Input
            type="number"
            onChange={(e) =>
              setEditingRate((prev: InterestRateRq) => ({
                ...prev,
                minimumLoanTerm: e.target.value ? Number(e.target.value) : 0,
              }))
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateInterestRateModal;
