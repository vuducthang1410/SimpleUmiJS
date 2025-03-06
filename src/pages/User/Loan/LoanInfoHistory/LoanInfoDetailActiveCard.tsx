import { CreditCardOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import './LoanInfoDetailCard.css';
import { LoanDetailActiveRp } from '@/types/LoanInfo';

const { Title, Text } = Typography;

interface LoanProps {
    loan: LoanDetailActiveRp
    showModal: (loanInfoId: string) => void,
    dispatch: (action: { type: string; payload?: any }) => void;
    showDetailModal: (status: boolean) => void

}

const LoanCard: React.FC<LoanProps> = ({ loan, showModal, dispatch, showDetailModal }) => {
    const addLoanDetailInfoToDvaModel = () => {
        dispatch({
            type: 'loanDetailInfo/updateLoanDetailInfo',
            payload: loan,
        });
    }
    return (
        <Card hoverable className="loan-card">
            {/* Header */}
            <div className="loan-header">
                <CreditCardOutlined className="loan-icon" />
                <Title level={4} className="loan-title">
                    {loan.loanProductName}
                </Title>
            </div>

            {/* Phần nội dung chính */}
            <div className="loan-body">
                {/* Thông tin khoản vay */}
                <div className="loan-section">
                    <Title level={5} className="section-title">Thông tin khoản vay</Title>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Text strong>Số tiền vay:</Text>
                            <Text className="money">{loan.loanAmount}</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>Ngày vay:</Text>
                            <Text>{loan.loanDate}</Text>
                        </Col>
                        <Col span={12} style={{ width: "100%" }}>
                            <Text strong>Còn lại:</Text>
                            <Text className="money">{loan.loanAmountRemaining}</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>Ngày đáo hạn:</Text>
                            <Text>{loan.dueDate}</Text>
                        </Col>
                        {/* <Col span={12}>
                            <Text strong>Kỳ hạn:</Text>
                            <Text>
                                {loan.loanTermName} ({loan.loanTerm} tháng)
                            </Text>
                        </Col> */}
                    </Row>
                </div>

                {/* Thông tin trả nợ kỳ tới */}
                <div className="loan-section">
                    <Title level={5} className="section-title">Thông tin trả nợ kỳ hiện tại</Title>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Text strong>Số tiền thanh toán:</Text>
                            <Text className="money">{loan.nextLoanAmountRepayment}</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>Ngày tới hạn:</Text>
                            <Text>{loan.nextRepaymentDate}</Text>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Footer với các button */}
            <div className="loan-footer">
                <Space>
                    <Button type="default" onClick={() => { addLoanDetailInfoToDvaModel(), showDetailModal(true) }}>Chi tiết</Button>
                    <Button type="primary" onClick={() => { showModal(loan.loanInfoId) }}>Tất toán</Button>
                </Space>
            </div>
        </Card>
    );
};

export default LoanCard;
