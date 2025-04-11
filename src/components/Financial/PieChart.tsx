import { PieChartData } from '@/types/financialInfo';
import { DataCallback } from '@/types/InterestRate';
import { getUserInfoInLocalStorage } from '@/utils/UserInfo';
import { Pie } from '@ant-design/plots';
import { useDispatch } from '@umijs/max';
import { Card, message, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

const LoanPieChart: React.FC = () => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      const user = getUserInfoInLocalStorage();
      dispatch({
        type: 'financialInfo/getDetailStatisticalByCifCode',
        payload: {
          cifCode: user?.cifCode,
          cbUpdate: setData,
        },
        callback: (response: DataCallback) => {
          if (!response.isSuccess) message.error(response.message);
        },
      });
    };
    setLoading(false);
    loadData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const config = {
    data,
    angleField: 'value',
    colorField: 'key',
    radios:1,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
        fontSize:10 
      },
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        layout: 'vertical', 
        rowPadding: 5,
      },
    },
  };

  return (
    <Card title="Thống kê Khoản Vay">
      {loading ? <Spin size="large" /> : <Pie {...config} />}
    </Card>
  );
};

export default LoanPieChart;
