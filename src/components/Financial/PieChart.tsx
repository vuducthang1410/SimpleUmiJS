import { PieChartData } from '@/types/financialInfo';
import { DataCallback } from '@/types/InterestRate';
import { Pie, PieConfig } from '@ant-design/plots';
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
      dispatch({
        type: 'financialInfo/getDetailStatisticalByCifCode',
        payload: {
          cifCode: '13031133871',
          cbUpdate: setData,
        },
        callback: (response: DataCallback) => {
          if (!response.isSuccess) message.error(response.message);
        },
      });
    };
    setLoading(false)
    loadData();
  }, []);
  useEffect(()=>{
    console.log(data)
  },[data])
  const config: PieConfig = {
    data,
    angleField: 'value',
    colorField: 'key',
    radius: 0.6,
    label: {
      text: (d: PieChartData) =>
        `${d.key}\n${d.value.toFixed(2)}% (${d.realValue})`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
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
