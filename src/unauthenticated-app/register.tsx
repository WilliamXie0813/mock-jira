import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen: React.VFC = () => {
	const { register, user } = useAuth();

	function handleSubmit(values: { username: string; password: string }) {
		register(values);
	}

	return (
		<Form onFinish={handleSubmit}>
			<Form.Item
				name={"username"}
				rules={[{ required: true, message: "请输入用户名" }]}
			>
				<Input placeholder="用户名" type="text" name="username" />
			</Form.Item>
			<Form.Item
				name={"password"}
				rules={[{ required: true, message: "请输入密码" }]}
			>
				<Input placeholder="密码" type="password" name="password" />
			</Form.Item>
			<Form.Item>
				<LongButton type="primary" htmlType="submit">
					注册
				</LongButton>
			</Form.Item>
		</Form>
	);
};
