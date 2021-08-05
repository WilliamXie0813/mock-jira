import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const LoginScreen: React.VFC<{
	onError: (err: Error) => void;
}> = ({ onError }) => {
	const { login } = useAuth();
	const { run, isLoading } = useAsync();

	function handleSubmit(values: { username: string; password: string }) {
		run(login(values)).catch(onError);
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
				<LongButton loading={isLoading} type="primary" htmlType="submit">
					登录
				</LongButton>
			</Form.Item>
		</Form>
	);
};
