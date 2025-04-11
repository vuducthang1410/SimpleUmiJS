import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import styles from './RegisterInfoLogin.module.css';
import { useSelector } from '@umijs/max';
import { RegisterDataForm } from '@/types/User';

interface RegisterInfoProps{
  registerInfo: RegisterDataForm;
  setRegisterInfo: (info: RegisterDataForm) => void;
}
const RegisterInfoLogin: React.FC<RegisterInfoProps> = ({ registerInfo,setRegisterInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.label} style={{margin:10}}>
            Thông tin đăng nhập 
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Số điện thoại</label>
          <Input
            name="phone"
            placeholder="Nhập số điện thoại"
            value={registerInfo?.phone || ""}
            onChange={handleChange}
            className={styles.input}
            prefix={<UserOutlined className={styles.icon} />}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Mật khẩu</label>
          <Input.Password
            name="password"
            placeholder="Nhập mật khẩu"
            value={registerInfo?.password||''}
            onChange={handleChange}
            className={styles.input}
            prefix={<LockOutlined className={styles.icon} />}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Nhập lại mật khẩu</label>
          <Input.Password
            name="repeatPassword"
            placeholder="Nhập lại mật khẩu"
            value={"form.repeatPassword"}
            onChange={handleChange}
            className={styles.input}
            prefix={<LockOutlined className={styles.icon} />}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterInfoLogin;
