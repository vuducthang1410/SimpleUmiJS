import React, { useEffect, useState } from 'react';
import { Select, Card, Button, Modal } from 'antd';
import LoanProductTable from '@/components/LoanProduct/LoanProductTable';
import { fetchLoanProducts, LoanProduct } from '@/services/LoanProduct/loanProduct';
import { PageContainer } from '@ant-design/pro-components';
import { history } from 'umi';

const { Option } = Select;

const LoanProductPage: React.FC = () => {
    const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        fetchLoanProducts(active)
            .then((res) => setLoanProducts(res.data.loanProductRpList))
            .finally(() => setLoading(false));
    }, [active]);

    return (
        <PageContainer>
            <div style={{ display: 'flex', marginBottom: 20, gap: 10 }}>
                <Select value={active} onChange={setActive} style={{ width: 160 }}>
                    <Option value={true}>Đang Hoạt Động</Option>
                    <Option value={false}>Ngừng Hoạt Động</Option>
                </Select>
                <Button type="primary" onClick={() => history.push('/loan-products/create')}>
                    Tạo sản phẩm vay
                </Button>
            </div>

            <LoanProductTable data={loanProducts} loading={loading} />
        </PageContainer>
    );
};

export default LoanProductPage;
