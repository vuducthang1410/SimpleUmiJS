import { RegisterDataForm } from '@/types/User';
import {
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Input, Select, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import './RegisterInfoForm.css';
interface RegisterInfoProps {
  registerInfo: RegisterDataForm;
  setRegisterInfo: (data: RegisterDataForm) => void;
}
const RegisterInfoForm: React.FC<RegisterInfoProps> = ({
  registerInfo,
  setRegisterInfo,
}) => {
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

  return (
    <div className="register-info-container">
      <div className="register-info-card">
        <h2 className="form-title">Đăng ký thông tin cá nhân</h2>

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
            <Input
              prefix={<HomeOutlined />}
              placeholder="Nhập địa chỉ"
              name="placeOrigin"
              value={registerInfo.placeOrigin}
              onChange={handleChange}
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
            <label>Ngày sinh</label>
            <Input
              type="date"
              name="dob"
              value={registerInfo.dob}
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
