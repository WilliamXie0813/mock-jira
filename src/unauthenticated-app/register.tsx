import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen: React.VFC<{
	onError: (err: Error) => void;
}> = ({ onError }) => {
	const { register } = useAuth();

	async function handleSubmit({
		cpassword,
		...values
	}: {
		cpassword: string;
		username: string;
		password: string;
	}) {
		if (cpassword !== values.password) {
			return onError(new Error("请确认两次输入的密码相同"));
		}
		try {
			await register(values);
		} catch (error) {
			onError(error);
		}
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
			<Form.Item
				name={"cpassword"}
				rules={[{ required: true, message: "请确认密码" }]}
			>
				<Input placeholder="确认密码" type="password" name="cpassword" />
			</Form.Item>
			<Form.Item>
				<LongButton type="primary" htmlType="submit">
					注册
				</LongButton>
			</Form.Item>
		</Form>
	);
};
