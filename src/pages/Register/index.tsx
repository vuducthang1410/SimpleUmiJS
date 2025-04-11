import LoadingOverlay from '@/components/Loading';
import RegisterInfoForm from '@/components/Register/RegisterInfoForm';
import RegisterInfoLogin from '@/components/Register/RegisterInfoLogin';
import UploadIdentityCard from '@/components/Register/UploadIdentityCard';
import { DataCallback } from '@/types/InterestRate';
import { RegisterDataForm } from '@/types/User';
import { history, useDispatch, useSelector } from '@umijs/max';
import { Button, message, Steps } from 'antd';
import React, { useState } from 'react';
import './style.css';
const steps = [
  {
    title: '1',
  },
  {
    title: '2',
  },
  {
    title: '3',
  },
];

const Register: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { userRegister, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [registerInfo, setRegisterInfo] = useState<RegisterDataForm | any>();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: '' }));
  const convertToFormData = (data: RegisterDataForm) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value !== 'object') {
        formData.append(key, value);
      }
    });
    if (data.identityCardFront) {
      formData.append('identityCardFront', data.identityCardFront);
    }
    if (data.identityCardBack) {
      formData.append('identityCardBack', data.identityCardBack);
    }
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    return formData;
  };

  const regiterAccount = () => {
    dispatch({
      type: 'user/registerInfoPersonal',
      payload: { formData: convertToFormData(registerInfo) },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
          history.push('/AccountVerification', { email: registerInfo.mail });
        } else {
          message.error(response.message);
        }
      },
    });
  };
  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <div className="register-box-title" style={{ marginTop: 25 }}>
            <img
              src="https://www.saokim.com.vn/wp-content/uploads/2023/01/Bieu-Tuong-Logo-Ngan-Hang-Kien-Long-Bank.png"
              alt="Logo"
              className="logo"
            />
            <h1 className="system-title">KLB-Banking</h1>
            <h2>Đăng ký tài khoản</h2>
          </div>
          <div className="step-container">
            <Steps current={current} items={items} direction="horizontal" />
          </div>
          <div className="content-box">
            {current === 0 && (
              <RegisterInfoLogin
                registerInfo={registerInfo}
                setRegisterInfo={setRegisterInfo}
              />
            )}
            {current === 1 && (
              <RegisterInfoForm
                registerInfo={registerInfo}
                setRegisterInfo={setRegisterInfo}
              />
            )}
            {current === 2 && (
              <UploadIdentityCard
                registerInfo={registerInfo}
                setRegisterInfo={setRegisterInfo}
              />
            )}
          </div>

          <div>
            <div className="button-group">
              {current > 0 && (
                <Button className="prev-button" onClick={prev}>
                  Quay lại
                </Button>
              )}
              {current < items.length - 1 && (
                <Button type="primary" onClick={next}>
                  Tiếp tục
                </Button>
              )}
              {current === items.length - 1 && (
                <Button type="primary" onClick={regiterAccount}>
                  Đăng ký
                </Button>
              )}
            </div>

            <div style={{ marginBottom: 15 }}>
              <label className="login-link">
                Bạn đã có tài khoản?
                <a onClick={() => history.push('/login')}>Đăng nhập</a>
              </label>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default Register;
