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
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        marginTop:'10%'
      }}
    >
      <div style={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
        <img
          src="https://www.saokim.com.vn/wp-content/uploads/2023/01/Bieu-Tuong-Logo-Ngan-Hang-Kien-Long-Bank.png"
          height="200"
        />
        <label style={{ fontSize: 20, fontWeight: 500,textAlign:'center' }}>
          {'CHÀO MỪNG TỚI HỆ THỐNG QUẢN LÝ GIAO DỊCH'}
        </label>
        <label style={{ fontSize: 28, fontWeight: 600,textAlign:'center', color: '#ff8e2e',width:600 }}>
          {'KLB-Banking'}
        </label>
      </div>
    </div>
  );
};

export default HomePage;
