import React, { useEffect, useState } from "react";
import { Form, InputNumber, Select, Button, Checkbox, Typography, Modal } from "antd";
import { API } from "@/types/financialInfo";
import { useDispatch } from "@umijs/max";

const { Title, Text } = Typography;
const { Option } = Select;
interface DataProps {
  loanProductId: string,
  loanProductName: String,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const LoanRegistrationForm: React.FC<DataProps> = ({ loanProductId, loanProductName, isModalOpen, setIsModalOpen }) => {
  const [financialInfoRp, setFinancialInfoResponse] = useState<API.FinancialInfoRp>()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    formDeftRepayment: "",
    loanAmount: 0,
    loanTerm: 0,
    loanUnit: "MONTH",
    isAgreed: false,
  });


  const handleChange = (key: string, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.isAgreed) {
      alert("Bạn phải đồng ý với điều khoản trước khi gửi đăng ký vay!");
      return;
    }
    console.log("Dữ liệu gửi đi:", formData);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData)
      dispatch({
        type: 'financialInfo/getFinancialInfoByCustomerId',
        payload: { cifCode: userData.cifCode, callback: setFinancialInfoResponse }
      })
  }, [])

  return (
    <div style={styles.container}>
      <Modal
        title={<Title level={3} style={styles.title}>📌 Đăng ký vay vốn</Title>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        {/* Thông tin cá nhân */}
        <div style={styles.sectionContainer}>
          <label style={styles.sectionTitle}>Thông tin cá nhân</label>
          <div style={styles.infoItem}><Text strong>Họ và tên:</Text> {financialInfoRp?.customerName}</div>
          <div style={styles.infoItem}><Text strong>Số điện thoại:</Text> {financialInfoRp?.numberPhone}</div>
          <div style={styles.infoItem}><Text strong>CCCD:</Text> {financialInfoRp?.identificationNumber}</div>
          <div style={styles.infoItem}><Text strong>Ngày sinh:</Text> {financialInfoRp?.dateOfBirth}</div>
        </div>

        {/* Form đăng ký vay */}
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item required>
            <span style={styles.sectionTitle}>Sản phẩm vay: <label>{loanProductName}</label></span>
          </Form.Item>
          <Form.Item label={<Text strong>Phương thức trả nợ</Text>} required>
            <Select style={styles.input} placeholder="Chọn phương thức" value={formData.formDeftRepayment} onChange={(value) => handleChange("formDeftRepayment", value)}>
              <Option value="PRINCIPAL_INTEREST_DECREASING">Trả gốc & lãi theo dư nợ giảm dần</Option>
              <Option value="PRINCIPAL_AND_INTEREST_MONTHLY">Trả gốc & lãi cố định hàng tháng</Option>
            </Select>
          </Form.Item>

          <Form.Item label={<Text strong>Số tiền vay (VNĐ)</Text>} required>
            <InputNumber style={styles.moneyInput} min={1} placeholder="Nhập số tiền" value={formData.loanAmount}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ"}
              parser={(value) => parseInt(value?.replace(/\D/g, "") || "0", 10)}
              onChange={(value) => handleChange("loanAmount", value)} />
          </Form.Item>

          <Form.Item label={<Text strong>Kỳ hạn vay</Text>} required>
            <InputNumber style={styles.input} min={0} placeholder="Nhập kỳ hạn" value={formData.loanTerm} onChange={(value) => handleChange("loanTerm", value)} />
          </Form.Item>

          <Form.Item label={<Text strong>Đơn vị kỳ hạn</Text>} required>
            <Select style={styles.input} value={formData.loanUnit} onChange={(value) => handleChange("loanUnit", value)}>
              <Option value="MONTH">Tháng</Option>
              <Option value="YEAR">Năm</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Checkbox checked={formData.isAgreed} onChange={(e) => handleChange("isAgreed", e.target.checked)}>
              Tôi đồng ý với các điều khoản và điều kiện vay
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={!formData.isAgreed} style={styles.submitButton}>
              Gửi đăng ký vay
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#ffffff" },
  title: { textAlign: "center" as "center", color: "#1890ff" },
  sectionContainer: { marginBottom: "20px", padding: "10px", borderRadius: "8px", backgroundColor: "#f0f2f5" },
  sectionTitle: { fontSize: 16, fontWeight: 800, marginBottom: "10px", display: "block", color: "#333" },
  infoItem: { marginBottom: "10px" },
  input: { width: "100%" },
  moneyInput: { width: "100%", fontSize: "14px" },
  submitButton: { backgroundColor: "#1890ff", color: "white", fontWeight: "bold", padding: "10px", borderRadius: "8px" }
};

export default LoanRegistrationForm;
