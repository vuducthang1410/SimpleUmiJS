import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';
import React from 'react';

const FinancialStatusStepForm: React.FC = () => {
  return (
    <Steps
      current={0}
      style={{width:'80%'}}
      items={[
        {
          title: 'Đăng ký thông tin tài chính',
          icon: <UserOutlined />,
        },
        {
          title: 'Chờ xét duyệt thông tin',
          icon: <SolutionOutlined />,
        },
        {
          title: 'Kết quả xét duyệt',
          icon: <SmileOutlined />,
        },
      ]}
    />
  );
};

export default FinancialStatusStepForm;
