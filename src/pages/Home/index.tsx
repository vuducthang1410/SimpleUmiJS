import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import DemoColumn from "./PieChartReport";

const HomePage: React.FC = () => {
  const { initialState } = useModel("@@initialState");

  const data = [
    { type: "Số tiền đã cho vay", value: 5000000 },
    { type: "Số tiền người dùng đã trả", value: 3000000 },
    { type: "Số tiền còn đang cho vay", value: 2000000 },
    { type: "Số tiền lãi đã trả", value: 500000 },
    { type: "Số tiền lãi dự kiến nhận", value: 700000 },
  ];


  return (
    <PageContainer ghost style={{ width: "1000px", height: "400px" }}>
      <DemoColumn />
    </PageContainer>
  );
};

export default HomePage;
