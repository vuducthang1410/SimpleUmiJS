import { DataCallback } from '@/types/InterestRate';
import { formatCurrency } from '@/utils/format';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Input, message, Modal, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const FinancialInfoRegisterModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [unit, setUnit] = useState('MONTH');
  const [income, setIncome] = useState(''); // Lưu giá trị gốc
  const [displayIncome, setDisplayIncome] = useState(''); // Hiển thị trên ô input
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeType, setIncomeType] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setIncome(rawValue);
    setDisplayIncome(rawValue);
  };

  const handleIncomeBlur = () => {
    setDisplayIncome(income ? formatCurrency(income) : '');
  };

  const handleUpload = ({ fileList }: any) => {
    setFileList(fileList);
  };

  useEffect(() => {
    console.log('Thu nhập đã nhập:', income);
  }, [income]);

  const handleSubmit = async () => {
    if (!income || !incomeSource || !incomeType) {
      message.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append(
      'financialInfoRq',
      new Blob(
        [
          JSON.stringify({
            unit,
            income,
            incomeSource,
            incomeType,
            cifCode: user.cifCode,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    fileList.forEach((file) => {
      formData.append('incomeVerificationDocuments', file.originFileObj);
    });
    dispatch({
      type: 'financialInfo/registerFinnancialInfo',
      payload: { formData: formData },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
    onClose();
    setLoading(false);
  };

  return (
    <Modal
      title="Nhập thông tin tài chính"
      open={visible}
      onCancel={onClose}
      cancelText={'Hủy'}
      onOk={handleSubmit}
      okText={'Đăng ký'}
      confirmLoading={loading}
    >
      <div className="form-group">
        <label>Đơn vị thời gian</label>
        <Select value={unit} onChange={setUnit} style={{ width: '100%' }}>
          <Option value="MONTH">Tháng</Option>
          <Option value="YEAR">Năm</Option>
        </Select>
      </div>

      <div className="form-group">
        <label>Thu nhập</label>
        <Input
          value={displayIncome}
          onChange={handleIncomeChange}
          onBlur={handleIncomeBlur}
        />
      </div>

      <div className="form-group">
        <label>Nguồn thu nhập</label>
        <Input
          value={incomeSource}
          onChange={(e) => setIncomeSource(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Loại thu nhập</label>
        <Input
          value={incomeType}
          onChange={(e) => setIncomeType(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Tài liệu xác minh thu nhập</label>
        <Upload
          multiple
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Chọn tệp</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default FinancialInfoRegisterModal;
