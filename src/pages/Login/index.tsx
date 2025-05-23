import { DataLogin } from '@/types/DataToken';
import { DataCallback } from '@/types/InterestRate';
import { history, useDispatch, useModel, useSelector } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.css';
import LoadingOverlay from '@/components/Loading';

const Login: React.FC = () => {
  const [dataLogin, setDataLogin] = useState<DataLogin>({
    phone: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { setInitialState } = useModel('@@initialState');
  const { user, loading } = useSelector((state: any) => state.auth);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: 'auth/login',
      payload: { dataLogin: dataLogin },
      callback: (response: DataCallback) => {
        if (!response.isSuccess) {
          message.error(response.message);
        }
      },
    });
  };
  useEffect(() => {
    if (user)
      if (user.isLogin) {
        console.log(user);
        setInitialState((prev) => ({ ...prev, currentUser: user }));
        const pathName = localStorage.getItem('pathname');
        if (pathName) {
          history.push(pathName);
        } else {
          history.push('/');
        }
      }
  }, [user]);

  return (
    <div
      className="login-page"
      style={{
        // width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20,
        marginRight:20
      }}
    >
      <div className="login-container">
        <div className="login-box">
          {/* Logo Doanh Nghiệp */}
          <img
            src="https://www.saokim.com.vn/wp-content/uploads/2023/01/Bieu-Tuong-Logo-Ngan-Hang-Kien-Long-Bank.png"
            alt="Logo"
            className="logo"
          />
          <h1 className="system-title">KLB-Banking</h1>
          <h2 style={{ marginTop: 5 }}>Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                value={dataLogin.phone}
                onChange={(e) =>
                  setDataLogin((prev: DataLogin) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={dataLogin.password}
                onChange={(e) =>
                  setDataLogin((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <div className="forgot-password">
              <a onClick={() => history.push('/forgot-password')}>
                Quên mật khẩu?
              </a>
            </div>
            <button type="submit" className="btn-login">
              Đăng nhập
            </button>
          </form>
          <p className="register-link">
            Chưa có tài khoản?{' '}
            <a onClick={() => history.push('/register')}>Đăng ký ngay</a>
          </p>
        </div>
      </div>
      <LoadingOverlay loading={loading}/>
    </div>
  );
};

export default Login;
