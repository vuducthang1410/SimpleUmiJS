import { API } from '@/types/financialInfo';
import { DataCallback } from '@/types/InterestRate';
import { formatCurrency } from '@/utils/format';
import { useDispatch } from '@umijs/max';
import { Button, Form, Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
type FinancialInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  record?: API.FinancialInfoItem;
};

export default function FinancialInfoModal({
  isOpen,
  onClose,
  record,
}: FinancialInfoModalProps) {
  const [formData, setFormData] = useState({
    financialInfoId: record?.financialInfoId || '',
    statusFinancialInfo: 'APPROVED',
    note: '',
    loanAmountLimit: '',
  });
  const [displayLoanAmountLimit, setDisplayLoanAmountLimit] = useState('');
  const dispatch = useDispatch();

  const handleLoanAmountLimitChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setFormData((prev: any) => ({ ...prev, loanAmountLimit: rawValue }));
    setDisplayLoanAmountLimit(rawValue);
  };

  const handleloanAmountLimitBlur = () => {
    setDisplayLoanAmountLimit(
      formData.loanAmountLimit ? formatCurrency(formData.loanAmountLimit) : '',
    );
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log(record);
      dispatch({
        type: 'financialInfoAdmin/approvedFinancialRequest',
        payload: { data: formData },
        callback: (response: DataCallback) => {
          if (response.isSuccess) {
            message.success("Xét duyệt thành công");
          } else {
            message.error(response.message);
          }
        },
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      financialInfoId: record?.financialInfoId,
    }));
  }, [record]);
  return (
    <Modal
      title="Đăng ký thông tin tài chính"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="rounded-lg p-4 shadow-lg"
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Status">
          <Input
            name="statusFinancialInfo"
            value={formData.statusFinancialInfo}
            readOnly
            className="rounded-md bg-gray-100"
          />
        </Form.Item>
        <Form.Item label="Note">
          <Input.TextArea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="rounded-md"
          />
        </Form.Item>
        <Form.Item label="Loan Amount Limit">
          <Input
            name="loanAmountLimit"
            value={displayLoanAmountLimit}
            onChange={handleLoanAmountLimitChange}
            onBlur={handleloanAmountLimitBlur}
            className="rounded-md"
          />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-gray-500 text-white rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 text-white rounded-md"
          >
            Approve
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
