import { useSelector } from '@umijs/max';
import { useEffect } from 'react';
import FinancialStatusStepForm from './User/FinancialStatus';

const HomePage: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return user == undefined || user.role === 'CUSTOMER' ? (
    <div
      className="home-page"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <FinancialStatusStepForm />
    </div>
  ) : (
    <></>
  );
};

export default HomePage;
