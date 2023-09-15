import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const checkUsername = await axios.post("https://property-search-i2j1.onrender.com/auth/check-username", {
                username: values.username,
            });

            if (checkUsername.data.message === "Username already exists") {
                message.loading("Username already exists. Please choose a different one.");
            } else {
                await axios.post("https://property-search-i2j1.onrender.com/auth/register", {
                    username: values.username,
                    password: values.password,
                });
                message.success("Registration Completed! Now login.");
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card style={{ maxWidth: 600, margin: "0 auto", marginTop: "20px"  }}>
        <Form
            form={form}
            name="normal_register"
            className="register-form"
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, margin: "0 auto" }}
        >
            <h2>Register</h2>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Register
                </Button>
                Or <Link to="/login">login now!</Link>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default RegisterForm;
