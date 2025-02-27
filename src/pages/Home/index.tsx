import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
     <PageContainer ghost style={{ width: "1000px", height: "100px" }}>
      <div>
        <div style={{ color: 'red' }}>Hello world</div>
      </div>
    </PageContainer>     
  );
};

export default HomePage;
