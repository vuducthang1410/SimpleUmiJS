import React from 'react';
import { Upload, Button, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload: React.FC<{ form: any }> = ({ form }) => {
    const normFile = (e: any) => e.fileList.map((file: any) => file.originFileObj);

    return (
        <Form.Item name="files" label="Tài liệu xác minh" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload multiple beforeUpload={() => false}>
                {/* <Button icon={<UploadOutlined />}>Chọn file</Button> */}
            </Upload>
        </Form.Item>
    );
};

export default FileUpload;