import React from 'react';
import { Card } from 'antd';
import FinancialForm from '@/components/Financial/RegisterForm';

const FinancialInfoRegisterPage: React.FC = () => {
    return (
        <Card title="Đăng ký thông tin tài chính">
            <FinancialForm />
        </Card>
    );
};

export default FinancialInfoRegisterPage;