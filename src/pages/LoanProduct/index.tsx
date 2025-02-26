import React, { useEffect, useState } from 'react';
import { Select, Card } from 'antd';
import LoanProductTable from '@/components/LoanProduct/LoanProductTable';
import { fetchLoanProducts, LoanProduct } from '@/services/LoanProduct/loanProduct';

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
        <Card title="Danh sách Sản Phẩm Vay" extra={
            <Select value={active} onChange={setActive} style={{ width: 160 }}>
                <Option value={true}>Đang Hoạt Động</Option>
                <Option value={false}>Ngừng Hoạt Động</Option>
            </Select>
        }>
            <LoanProductTable data={loanProducts} loading={loading} />
        </Card>
    );
};

export default LoanProductPage;
