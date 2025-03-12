import { Col, Row, Typography } from "antd";

const { Text } = Typography;

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <Row style={{ marginBottom: 8 }}>
    <Col span={8}>
      <Text strong>{label}:</Text>
    </Col>
    <Col span={16}>
      <Text>{value || "Chưa cập nhật"}</Text>
    </Col>
  </Row>
);

export default InfoRow;
