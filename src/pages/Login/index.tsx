import { User } from "@/types/User";
import { history } from "@umijs/max";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";

const Login: React.FC = () => {
    const [user, setUser] = useState<User>();
    const onFinish = (values: { username: string; password: string }) => {

        if (values.username === "admin" && values.password === "123456") {
            setUser({ userName: values.username, token: "fake-jwt-token", role: "admin" });
            localStorage.setItem("user", JSON.stringify(user));
            history.push("/home");
        } else if (values.username === "manager" && values.password === "123456") {
            setUser({ userName: values.username, token: "fake-jwt-token", role: "manager" });
            localStorage.setItem("user", JSON.stringify(user));
            history.push("/home");
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Form onFinish={onFinish} style={{ width: 300 }}>
                <Form.Item name="username" rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}>
                    <Input placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Nhập mật khẩu!" }]}>
                    <Input.Password placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
