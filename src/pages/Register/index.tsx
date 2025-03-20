import LoadingOverlay from '@/components/Loading';
import RegisterInfoForm from '@/components/Register/RegisterInfoForm';
import RegisterInfoLogin from '@/components/Register/RegisterInfoLogin';
import UploadIdentityCard from '@/components/Register/UploadIdentityCard';
import { DataCallback } from '@/types/InterestRate';
import { RegisterDataForm } from '@/types/User';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message, Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.css';
const steps = [
  {
    title: '1',
    content: 'First-content',
  },
  {
    title: '2',
    content: 'Second-content',
  },
  {
    title: '3',
    content: 'Last-content',
  },
];

const Register: React.FC = () => {
  const { token } = theme.useToken();
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

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const convertToFormData = (data: RegisterDataForm) => {
    const formData = new FormData();
  
    // Thêm các giá trị chuỗi vào formData
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value !== "object") {
        formData.append(key, value);
      }
    });
  
    // Thêm các file vào formData (nếu có)
    if (data.identityCardFront) {
      formData.append("identityCardFront", data.identityCardFront);
    }
    if (data.identityCardBack) {
      formData.append("identityCardBack", data.identityCardBack);
    }
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
  
    return formData;
  };
  
  const regiterAccount = () => {
console.log("aaaaaa")
    dispatch({
      type: 'user/registerInfoPersonal',
      payload: { formData:convertToFormData(registerInfo) },
      callback: (response: DataCallback) => {
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      },
    });
  };
  useEffect(() => {
    console.log(loading, userRegister);
  }, [userRegister]);
  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <Steps current={current} items={items} />

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
        </div>
      </div>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default Register;
