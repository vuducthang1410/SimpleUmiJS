import React, { useEffect, useState } from 'react';
import { Select, Card, Button, Modal, notification } from 'antd';
import LoanProductTable from '@/components/LoanProduct/LoanProductTable';
import { PageContainer } from '@ant-design/pro-components';
import LoanProductCreateModal from './model/LoanProductCreateModal';
import { useDispatch, useModel, useSelector } from '@umijs/max';
import { NotificationType } from '@/types/NotificationType';
const { Option } = Select;

const LoanProductPage: React.FC = () => {
    const dispatch = useDispatch();
    const { loanProductList, totalRecords } = useSelector((state: any) => state.loanProduct);

    const [loading, setLoading] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(true);
    const [visible, setVisible] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, title: string, description: string) => {
        api[type]({
            message: title,
            description: description,
        });
    };

    useEffect(() => {
        setLoading(true);
        dispatch({
            type: 'loanProduct/fetchLoanProducts',
            payload: { active: active, pageNumber: 0, pageSize: 10 },
        });
        setLoading(false);
    }, [active]);

    return (
        <PageContainer>
            {contextHolder}
            <div style={{ display: 'flex', marginBottom: 20, gap: 10 }}>
                <Select value={active} onChange={setActive} style={{ width: 160 }}>
                    <Option value={true}>Đang Hoạt Động</Option>
                    <Option value={false}>Ngừng Hoạt Động</Option>
                </Select>
                <Button type="primary" onClick={() => setVisible(true)}>Tạo sản phẩm vay</Button>
                <LoanProductCreateModal visible={visible} onClose={() => setVisible(false)} />
            </div>

            <LoanProductTable data={loanProductList} loading={loading}
                openNotificationWithIcon={openNotificationWithIcon} />
        </PageContainer>
    );
};

export default LoanProductPage;
