import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch,  useSelector } from '@umijs/max';
import { API } from '@/types/financialInfo';
import { PageContainer } from '@ant-design/pro-components';
import { getFinancialInfoColumns } from '@/components/Financial/FinancialInfoColumns';

const FinancialInfo: React.FC = () => {
    const {list,totalRecords,isLoading}=useSelector((state:any)=>state.financialInfoAdmin)
    const dispatch=useDispatch();
    useEffect(() => {
        console.log("ccc")
        dispatch({
            type:'financialInfoAdmin/fetchList',
            payload:{status:'PENDING'}
        })
    }, []);

    useEffect(() => {
        console.log('data cập nhật:', list);
    }, [list]);

    const handleDetail = (record: API.FinancialInfoItem) => {
        console.log('Chi tiết:', record);
    };

    return (
        <PageContainer>
            <Table
                columns={getFinancialInfoColumns(handleDetail)}
                dataSource={list}
                loading={isLoading}
                rowKey={(record) => record.amountLoanLimit} 
                pagination={{ total: totalRecords, pageSize: 12 }}
            />
        </PageContainer>
    );
};

export default FinancialInfo;
