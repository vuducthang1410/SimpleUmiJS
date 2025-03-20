import { RegisterDataForm } from '@/types/User';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React, { useState } from 'react';
import './UploadIdentityCard.css';
interface RegisterInfoProps {
  registerInfo: RegisterDataForm;
  setRegisterInfo: (info: RegisterDataForm) => void;
}
const UploadIdentityCard: React.FC<RegisterInfoProps> = ({
  registerInfo,
  setRegisterInfo,
}) => {
  const handleUpload = (
    file: File,
    key: 'identityCardFront' | 'identityCardBack',
  ) => {
    setRegisterInfo({
      ...registerInfo,
      [key]: file,
    });
    return false;
  };

  return (
    <div className="upload-container">
      <h3 className="upload-title">Tải lên ảnh CCCD</h3>
      <div className="upload-box">
        {/* Ảnh mặt trước */}
        <div className="upload-item">
          <div className="image-preview">
            {registerInfo.identityCardFront? (
              <img src={URL.createObjectURL(registerInfo.identityCardFront)} alt="CMND Front" />
            ) : (
              'Ảnh mặt trước'
            )}
          </div>
          <Upload
            showUploadList={false}
            beforeUpload={(file) =>
              handleUpload(file,'identityCardFront')
            }
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh mặt trước</Button>
          </Upload>
        </div>

        {/* Ảnh mặt sau */}
        <div className="upload-item">
          <div className="image-preview">
            {registerInfo.identityCardBack ? (
              <img src={URL.createObjectURL(registerInfo.identityCardBack)} alt="CMND Back" />
            ) : (
              'Ảnh mặt sau'
            )}
          </div>
          <Upload
            showUploadList={false}
            beforeUpload={(file) =>
              handleUpload(file,'identityCardBack')
            }
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh mặt sau</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default UploadIdentityCard;
