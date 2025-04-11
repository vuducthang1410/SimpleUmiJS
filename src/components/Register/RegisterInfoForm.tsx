import { getProvince } from '@/services/auth/auth';
import { Province, RegisterDataForm } from '@/types/User';
import {
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Input, Select, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import './RegisterInfoForm.css';
interface RegisterInfoProps {
  registerInfo: RegisterDataForm;
  setRegisterInfo: (data: RegisterDataForm) => void;
}
const RegisterInfoForm: React.FC<RegisterInfoProps> = ({
  registerInfo,
  setRegisterInfo,
}) => {
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };
  const handleAvatarUpload = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      setRegisterInfo({
        ...registerInfo,
        avatar: file,
      });
    }
  };
  const getProviceList = async () => {
    const response = await getProvince();
    setProvinceList(response?.data ?? []);
  };
  const handleProvinceChange = (value: string) => {
    setRegisterInfo({
      ...registerInfo,
      placeOrigin: value,
    });
  };

  useEffect(() => {
    console.log(provinceList);
  }, [provinceList]);
  useEffect(() => {
    getProviceList();
  }, []);
  return (
    <div className="register-info-container">
      <div className="register-info-card">
        <div className={'styles.label'}>Thông tin cá nhân</div>
        <div className="form-row">
          <div className="form-item">
            <label>Họ</label>
            <Input
              placeholder="Nhập họ"
              name="firstname"
              value={registerInfo.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label>Tên</label>
            <Input
              placeholder="Nhập tên"
              name="lastname"
              value={registerInfo.lastname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <label>Email</label>
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email"
              name="mail"
              value={registerInfo.mail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <label>Giới tính</label>
            <Select
              value={registerInfo.gender}
              onChange={(value) => {
                console.log(value);
                setRegisterInfo({ ...registerInfo, gender: value });
              }}
              style={{ width: 75 }}
            >
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nu">Nữ</Select.Option>
            </Select>
          </div>
          <div className="form-item">
            <label>CMND/CCCD</label>
            <Input
              prefix={<IdcardOutlined />}
              placeholder="Nhập số CMND/CCCD"
              name="identityCard"
              value={registerInfo.identityCard}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <label>Nguyên quán</label>
            <Select
              placeholder="Chọn tỉnh/thành phố"
              onChange={handleProvinceChange}
              value={registerInfo.placeOrigin}
              style={{ width: '100%', height: 40}}
            >
              {provinceList.map((province) => (
                <Select.Option key={province.number} value={province.name}>
                  {province.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="form-item">
            <label>Ngày sinh</label>
            <Input
              type="date"
              name="dob"
              value={registerInfo.dob}
              onChange={handleChange}
              style={{ height: 40 }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label>Địa chỉ</label>
            <Input
              prefix={<HomeOutlined />}
              placeholder="Nhập địa chỉ"
              name="address"
              value={registerInfo.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label>Ảnh đại diện</label>
            <Upload
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarUpload}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {registerInfo.avatar && (
              <img
                src={URL.createObjectURL(registerInfo.avatar)}
                alt="Ảnh đại diện"
                style={{ width: 100, height: 100, marginTop: 10 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInfoForm;
