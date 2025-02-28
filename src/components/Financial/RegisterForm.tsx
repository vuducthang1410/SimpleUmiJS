import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from '@umijs/max';
import FileUpload from './FileUpload';

const FinancialForm: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        dispatch({ type: 'financial/saveInfo', payload: values });
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}>
                <Select options={[{ label: 'MONTH', value: 'MONTH' }]} />
            </Form.Item>
            <Form.Item name="income" label="Thu nhập" rules={[{ required: true }]}>
                <Input type="number" />
            </Form.Item>
            <Form.Item name="incomeSource" label="Nguồn thu nhập" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="incomeType" label="Loại thu nhập" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="cifCode" label="CIF Code" rules={[{ required: true }]}>
                <Input type="number" />
            </Form.Item>
            <FileUpload form={form} />
            <Button type="primary" htmlType="submit">Gửi</Button>
        </Form>
    );
};

export default FinancialForm;
