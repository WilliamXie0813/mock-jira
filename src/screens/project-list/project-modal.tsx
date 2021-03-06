import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useEditProject, useAddProject } from "utils/project";
import { useProjectModal, useProjectQueryKey } from "./util";

export const ProjectModal = () => {
	const { projectModalOpen, close, editingProject, isLoading } =
		useProjectModal();
	const useMutateProject = editingProject ? useEditProject : useAddProject;
	const {
		mutateAsync,
		error,
		isLoading: mutateLoading,
	} = useMutateProject(useProjectQueryKey());

	const title = editingProject ? "编辑项目" : "创建项目";
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		mutateAsync({ ...editingProject, ...values }).then(() => {
			form.resetFields();
			close();
		});
	};

	useEffect(() => {
		form.setFieldsValue(editingProject);
	}, [editingProject, form]);

	console.log(editingProject);

	return (
		<Drawer
			forceRender={true}
			width="100%"
			visible={projectModalOpen}
			onClose={close}
		>
			<Container>
				<Spin size="large" spinning={isLoading}>
					<h1>{title}</h1>
					<ErrorBox error={error} />
					<Form
						form={form}
						layout="vertical"
						style={{ width: "40rem" }}
						onFinish={onFinish}
					>
						<Form.Item
							label={"名称"}
							name={"name"}
							rules={[{ required: true, message: "请输入项目名" }]}
						>
							<Input placeholder={"请输入项目名称"} />
						</Form.Item>

						<Form.Item
							label={"部门"}
							name={"organization"}
							rules={[{ required: true, message: "请输入部门名" }]}
						>
							<Input placeholder={"请输入部门名"} />
						</Form.Item>

						<Form.Item label={"负责人"} name={"personId"}>
							<UserSelect defaultOptionName={"负责人"} />
						</Form.Item>
						<Form.Item style={{ textAlign: "right" }}>
							<Button
								loading={mutateLoading}
								type={"primary"}
								htmlType={"submit"}
							>
								提交
							</Button>
						</Form.Item>
					</Form>
					<Button onClick={close}> close</Button>
				</Spin>
			</Container>
		</Drawer>
	);
};

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
